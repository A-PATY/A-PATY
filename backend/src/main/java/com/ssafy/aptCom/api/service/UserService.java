package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.db.entity.Auth;
import com.ssafy.aptCom.db.entity.User;

import java.util.Optional;

public interface UserService {

    // 카카오 회원번호로 사용자 찾기
    User getUserByKakaoUserNumber(String kakaoUserNumber);

    String[] createTokens(User user);

    User userNew(String kakaoNumber);

    User userSave(SignUpRequestDto signUpRequestDto, String kakaoUserNumber);

    Optional<Auth> getAuthByRefreshToken(String refreshToken);

    void logOut(Auth auth);
}
