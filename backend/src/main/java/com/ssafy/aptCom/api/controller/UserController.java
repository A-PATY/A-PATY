package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.api.dto.response.CategoryListDto;
import com.ssafy.aptCom.api.dto.response.LoginResponseDto;
import com.ssafy.aptCom.api.dto.response.ProfileImgListDto;
import com.ssafy.aptCom.api.dto.response.SuccessMessage;
import com.ssafy.aptCom.api.service.ProfileImgService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.db.entity.ProfileImg;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "회원 관리 API", tags = {"user"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileImgService profileImgService;

    @PostMapping("/auth/users/sign-up")
    @ApiOperation(value = "회원가입", notes = "최초 로그인 시 유저의 추가정보를 입력받아 회원가입을 완료한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> signUp(
            @RequestBody SignUpRequestDto signUpRequestDto, @AuthenticationPrincipal String kakaoUserNumber) {
        userService.userSave(signUpRequestDto, kakaoUserNumber);

        return ResponseEntity.status(200).body(SuccessMessage.of("회원가입이 완료되었습니다."));

    }

    @GetMapping("/profile-img")
    @ApiOperation(value = "프로필 이미지 리스트 조회", notes = "사용자가 설정가능한 프로필 이미지 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> profileImg() {

        List<ProfileImg> profileImgList = profileImgService.getProfileImgList();

        return ResponseEntity.status(200).body(ProfileImgListDto.of(profileImgList));

    }

}
