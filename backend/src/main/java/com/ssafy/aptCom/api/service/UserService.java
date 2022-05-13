package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.api.dto.request.UserModifyRequestDto;
import com.ssafy.aptCom.db.entity.Auth;
import com.ssafy.aptCom.db.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface UserService {

    // 카카오 회원번호로 사용자 찾기
    User getUserByKakaoUserNumber(String kakaoUserNumber);
    
    // JWT - access & refresh token 생성
    String[] createTokens(User user);
    
    // 신규 유저 생성
    User userNew(String kakaoNumber);
    
    // 유저 정보 저장
    User userSave(SignUpRequestDto signUpRequestDto, String kakaoUserNumber);

    // 유저 - 지역 커뮤니티 가입
    void userCommunitySave(String addressCode, User user);

    // Refresh Token으로 Auth Entity 찾기
    Optional<Auth> getAuthByRefreshToken(String refreshToken);
    
    // Auth 정보 삭제
    void deleteAuth(User user);
    
    // 유저 정보 수정
    User userModify(UserModifyRequestDto userModifyRequestDto, User user, String profileInfo);

    // 회원 탈퇴
    void deleteUser(User user);

}
