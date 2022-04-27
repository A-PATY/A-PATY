package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.db.entity.User;

import java.util.Optional;

public interface UserService {

    // 카카오 회원번호로 사용자 찾기
    User getUserByKakaoUserNumber(String kakaoUserNumber);

    String[] createTokens(User user);

    User userNew(String kakaoNumber);

}
