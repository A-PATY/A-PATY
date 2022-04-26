package com.ssafy.aptCom.api.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service("loginService")
public class LoginServiceImpl implements LoginService {

    @Value("${kakao.api}")
    private String apiKey;

    @Override
    public String getAccessToken(String accessCode) {

        String reqURL = "https://kauth.kakao.com/oauth/token";
        String redirectUrl = "http://localhost:3000/oauth/callback/kakao";
        String accessToken = "";

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

            br.close();
            bw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return accessToken;

    }

    @Override
    public HashMap<String, Object> getUserInfo(String accessToken) {

        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

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

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();

            String kakaoUserNumber = properties.getAsJsonObject().get("id").getAsString();
            userInfo.put("kakaoUserNumber", kakaoUserNumber);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return userInfo;

    }

}
