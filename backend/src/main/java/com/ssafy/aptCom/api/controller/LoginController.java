package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.SocialLoginDto;
import com.ssafy.aptCom.api.dto.response.*;
import com.ssafy.aptCom.api.service.CategoryService;
import com.ssafy.aptCom.api.service.LoginService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.common.jwt.TokenProvider;
import com.ssafy.aptCom.db.entity.Auth;
import com.ssafy.aptCom.db.entity.Category;
import com.ssafy.aptCom.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Slf4j
@Api(value = "소셜 로그인 API", tags = {"login"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/users")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private TokenProvider tokenProvider;

    @PostMapping("/log-in")
    @ApiOperation(value = "소셜 로그인", notes = "클라이언트에서 Access Code를 받아서 소셜 API를 통해 회원정보를 확인하고 토큰 생성 및 유저 정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginResponseDto.class),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> socialLogin(
            @RequestBody SocialLoginDto socialLoginDto, HttpServletRequest request) {
        log.info("access code: {}", socialLoginDto.getAccessCode());
        boolean isNew;
        String[] tokens;
        String accessCode = socialLoginDto.getAccessCode();

        try {
            String accessToken = loginService.getAccessToken(accessCode, request);
            HashMap<String, Object> kakaoInfo = loginService.getUserInfo(accessToken);
            String kakaoNum = String.valueOf(kakaoInfo.get("kakaoUserNumber"));

            User user = userService.getUserByKakaoUserNumber(kakaoNum);

            isNew = true;
            if (user == null) {
                user = userService.userNew(kakaoNum);
            } else {
                isNew = false;
            }

            tokens = userService.createTokens(user);

        } catch (IOException e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));
            log.info("controller 에러남");

            return ResponseEntity.status(400).body(ErrorMessage.of(400, "입력값이 유효하지 않습니다."));
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 소셜 로그인 실패"));
        }

        return ResponseEntity.status(200).body(LoginResponseDto.of(tokens, isNew));
    }

    @GetMapping("/user-info")
    @ApiOperation(value = "회원정보 반환", notes = "유저 정보를 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = UserInfoDto.class),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> userInfo(
            @AuthenticationPrincipal String loginUser) {

        User user;

        try {
            user = userService.getUserByKakaoUserNumber(loginUser);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 회원 정보 조회 실패"));
        }

        return ResponseEntity.status(200).body(UserInfoResponseDto.of(user));

    }

    @GetMapping("/category-list")
    @ApiOperation(value = "카테고리 리스트 조회", notes = "커뮤니티 게시판 카테고리 리스트를 조회하여 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> categoryList() {

        List<Category> categoryList;

        try {
            categoryList = categoryService.getCategoryList();
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 카테고리 리스트 조회 실패"));
        }

        return ResponseEntity.status(200).body(CategoryListDto.of(categoryList));

    }

    @GetMapping("/issue-token")
    @ApiOperation(value = "Access Token 재발행", notes = "Access Token 재발행 or Refresh Token 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> issueToken(
            @RequestHeader(value = "RefreshToken") String refreshToken) {

        Optional<Auth> auth = userService.getAuthByRefreshToken(refreshToken);
        User user = auth.get().getUser();

        try {
            boolean tokenValid = tokenProvider.isTokenValid(refreshToken);

            if (!tokenValid) {
                userService.deleteAuth(user);

                return ResponseEntity.status(400).body(ErrorMessage.of(400, "입력값이 유효하지 않습니다."));
            }
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, Access Token 재발급 실패"));
        }

        String accessToken = tokenProvider.createJwtAccessToken(user.getKakaoUserNumber(), user.getRoleList());
        return ResponseEntity.status(200).body(IssueTokenResponseDto.of(accessToken, refreshToken));

    }

    @GetMapping("/log-out")
    @ApiOperation(value = "로그아웃", notes = "로그아웃하면서 Refresh Token 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> logOut(
            @AuthenticationPrincipal String loginUser) {

        try {
            User user = userService.getUserByKakaoUserNumber(loginUser);
            userService.deleteAuth(user);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 로그아웃 실패"));
        }

        return ResponseEntity.status(200).body(SuccessMessage.of("로그아웃이 완료되었습니다."));

    }

}
