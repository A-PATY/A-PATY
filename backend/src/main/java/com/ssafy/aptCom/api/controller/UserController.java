package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.api.dto.request.UserModifyRequestDto;
import com.ssafy.aptCom.api.dto.response.ErrorMessage;
import com.ssafy.aptCom.api.dto.response.ProfileImgListDto;
import com.ssafy.aptCom.api.dto.response.SuccessMessage;
import com.ssafy.aptCom.api.service.FirebaseService;
import com.ssafy.aptCom.api.service.ProfileImgService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.db.entity.ProfileImg;
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

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Api(value = "회원 관리 API", tags = {"user"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProfileImgService profileImgService;

    @Autowired
    private FirebaseService firebaseService;

    @PostMapping("/auth/users/sign-up")
    @ApiOperation(value = "회원가입", notes = "최초 로그인 시 유저의 추가정보를 입력받아 회원가입을 완료한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> signUp(
            @RequestBody SignUpRequestDto signUpRequestDto, @AuthenticationPrincipal String loginUser) {

        try {
            User user = userService.userSave(signUpRequestDto, loginUser);
            userService.userCommunitySave(signUpRequestDto.getAddress(), user);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 회원가입 실패"));
        }

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

        List<ProfileImg> profileImgList;

        try {
            profileImgList = profileImgService.getProfileImgList();
            log.info("profileImgList : {}", profileImgList);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("error : {}", e.getCause());
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 프로필 이미지 리스트 조회 실패"));
        }

        return ResponseEntity.status(200).body(ProfileImgListDto.of(profileImgList));

    }

    @Transactional
    @PutMapping("/users/{profile-info}")
    @ApiOperation(value = "회원 정보 수정", notes = "토큰 검증 후 해당 유저 상세 정보 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> userModify(
            @PathVariable(value = "profile-info") String profileInfo,
            UserModifyRequestDto userModifyRequestDto,
            @AuthenticationPrincipal final String loginUser) {

        try {
            User user = userService.getUserByKakaoUserNumber(loginUser);

            String dtoAddress = userModifyRequestDto.getAddress();
            String userAddress = user.getBaseAddress().getAddress();

            if(user.getApartment() != null && dtoAddress != null) {
                String aptId = String.valueOf(user.getApartment().getId());
                if (!dtoAddress.equals(userAddress)) {
                    String dong = user.getDong();
                    String ho = user.getHo();
                    String familyId = aptId + "-" + dong + "-" + ho;
                    String userId = String.valueOf(user.getId());

                    firebaseService.deleteFamilyMember(familyId, userId);
                }
            }
            userService.userModify(userModifyRequestDto, user, profileInfo);

        } catch (Exception e) {
            e.printStackTrace();
            log.info("error: {}" , e.getCause());
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 회원 정보 수정 실패"));

        }

        return ResponseEntity.status(200).body(SuccessMessage.of("회원 정보가 수정되었습니다."));

    }

    @Transactional
    @DeleteMapping("/users")
    @ApiOperation(value = "회원 탈퇴", notes = "토큰 검증 후 해당 유저 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> userDelete(
            @AuthenticationPrincipal final String loginUser) {

        try {
            User user = userService.getUserByKakaoUserNumber(loginUser);

            if(user.getApartment() != null) {
                String aptId = String.valueOf(user.getApartment().getId());
                String dong = user.getDong();
                String ho = user.getHo();
                String familyId = aptId + "-" + dong + "-" + ho;
                String userId = String.valueOf(user.getId());

                firebaseService.deleteFamilyMember(familyId, userId);
            }
            userService.userDelete(user);

        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 회원 탈퇴 실패"));
        }

        return ResponseEntity.status(200).body(SuccessMessage.of("회원 탈퇴가 완료되었습니다."));

    }

}
