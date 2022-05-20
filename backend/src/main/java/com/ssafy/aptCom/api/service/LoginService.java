package com.ssafy.aptCom.api.service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;

public interface LoginService {
    
    // accessCode를 활용하여 Access Token 받기
    String getAccessToken(String accessCode, boolean testMode) throws IOException;

    // Access Token으로 카카오 유저정보(회원번호) 받기
    HashMap<String, Object> getUserInfo(String accessToken) throws IOException;
    
}
