package com.ssafy.aptCom.api.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service("loginService")
@Slf4j
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    @Value("${kakao.api}")
    private String apiKey;

    @Override
    public String getAccessToken(String accessCode, boolean testMode) throws IOException {

        String reqURL = "https://kauth.kakao.com/oauth/token";
        String accessToken = "";

        String redirectUrl;
        if (testMode) {
            redirectUrl = "http://localhost:3000/oauth/callback/kakao";
        } else {
            redirectUrl = "https://apaty.co.kr/oauth/callback/kakao";
        }

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();

            sb.append("grant_type=authorization_code");
            sb.append(String.format("&client_id=%s", apiKey)); // REST_API_KEY 입력
            sb.append(String.format("&redirect_uri=%s", redirectUrl)); // 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + accessCode);
            bw.write(sb.toString());
            bw.flush();

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line;
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            log.info("access token: {}", accessToken);
            br.close();
            bw.close();

        } catch (IOException e) {
            throw new IOException();
        }

        return accessToken;

    }

    @Override
    public HashMap<String, Object> getUserInfo(String accessToken) throws IOException {

        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqURL = "https://kapi.kakao.com/v1/user/access_token_info";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            // 요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            BufferedReader br2 = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line;
            String result = "";

            while ((line = br2.readLine()) != null) {
                result += line;
            }

            br2.close();

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String kakaoUserNumber = element.getAsJsonObject().get("id").getAsString();
            userInfo.put("kakaoUserNumber", kakaoUserNumber);
            log.info("userInfo: {}", userInfo);

        } catch (IOException e) {
            throw new IOException();
        }

        return userInfo;

    }

}
