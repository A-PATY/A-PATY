package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.response.LoginResponseDto;
import com.ssafy.aptCom.api.service.LoginService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Api(value = "소셜 로그인 API", tags = {"login"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/users")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @GetMapping("/log-in")
    @ApiOperation(value = "소셜 로그인", notes = "클라이언트에서 Access Code를 받아서 소셜 API를 통해 회원정보를 확인하고 토큰 생성 및 유저 정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginResponseDto.class),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> socialLogin(
            @RequestParam String accessCode) {

        String accessToken = loginService.getAccessToken(accessCode);
        System.out.println(accessToken);
        HashMap<String, Object> kakaoInfo = loginService.getUserInfo(accessToken);
        System.out.println(kakaoInfo);
        String kakaoNum = String.valueOf(kakaoInfo.get("kakaoUserNumber"));
        System.out.println(kakaoNum);

        User user = userService.getUserByKakaoUserNumber(kakaoNum);
        System.out.println(user);
        boolean isNew = true;
        if (user == null) {
            user = userService.userNew(kakaoNum);
        } else {
            isNew = false;
        }
        String[] tokens = userService.createTokens(user);
        System.out.println(tokens);
        return ResponseEntity.status(200).body(LoginResponseDto.of(tokens, user, isNew));
    }

}
