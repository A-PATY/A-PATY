package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.response.FamilyDto;
import com.ssafy.aptCom.api.dto.response.FamilyListDto;
import com.ssafy.aptCom.api.service.FamilyService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.common.response.ErrorResponseDto;
import com.ssafy.aptCom.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@Api(value = "가족 찾기 API", tags = {"family"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/family-list")
public class FamilyController {

    private final FamilyService familyService;
    private final UserService userService;

    @GetMapping
    @ApiOperation(value = "가족정보 찾기", notes = "유저의 가족정보를 조회한다")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getFamilyInfo(
            @AuthenticationPrincipal String loginUser
    ) {
        User user = userService.getUserByKakaoUserNumber(loginUser);

        if(user.getApartment() == null) {
            return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "입력값이 유효하지 않습니다."));
        }
        int aptId = user.getApartment().getId();
        String dong = user.getDong();
        String ho = user.getHo();

        List<FamilyDto> familyList;
        String familyId = aptId + "-" + dong + "-" + ho;

        try {
            if(aptId == 0 || dong.equals("") || ho.equals("")){
                return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "입력값이 유효하지 않습니다."));
            }
            familyList = familyService.getFamilyList(aptId, dong, ho);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 가족정보 조회 실패"));
        }

        return ResponseEntity.status(200).body(FamilyListDto.of(familyId, familyList));
    }

}
