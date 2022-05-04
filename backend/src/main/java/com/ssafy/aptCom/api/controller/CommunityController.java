package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.CommunityJoinRequestDto;
import com.ssafy.aptCom.api.dto.response.*;
import com.ssafy.aptCom.api.service.ApartmentService;
import com.ssafy.aptCom.api.service.S3Uploader;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.db.entity.Apartment;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@Slf4j
@Api(value = "커뮤니티 가입 API", tags = {"community"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/community/apt")
public class CommunityController {

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private UserService userService;

    @Autowired
    final S3Uploader s3Uploader;

    @GetMapping("")
    @ApiOperation(value = "아파트 커뮤니티 목록 조회", notes = "아파트 커뮤니티의 목록을 조회하고 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> aptCommunityList(
            @AuthenticationPrincipal String loginUser) {

        User user = userService.getUserByKakaoUserNumber(loginUser);

        List<Apartment> apartmentList;

        try {
            apartmentList = apartmentService.getApartmentList(user);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 아파트 목록 불러오기 실패"));
        }

        return ResponseEntity.status(200).body(ApartmentListDto.of(apartmentList));

    }

    @PostMapping("")
    @ApiOperation(value = "아파트 커뮤니티 가입", notes = "고지서 및 상세정보 입력하고 커뮤니티 가입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> communityJoin(
            @AuthenticationPrincipal String loginUser, CommunityJoinRequestDto communityJoinRequestDto) throws IOException {

        try {
            apartmentService.saveNoticeImage(communityJoinRequestDto, loginUser);
        } catch (IOException e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(400).body(ErrorMessage.of(400, "입력값이 유효하지 않습니다."));
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 상세 주소 인증 실패"));

        }

        return ResponseEntity.status(200).body(SuccessMessage.of("고지서 인증 응답을 기다려주세요."));

    }

}
