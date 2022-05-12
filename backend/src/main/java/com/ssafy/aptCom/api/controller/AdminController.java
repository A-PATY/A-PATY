package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.BillApprovalRequestDto;
import com.ssafy.aptCom.api.dto.request.BillRejectionRequestDto;
import com.ssafy.aptCom.api.dto.response.BillListDto;
import com.ssafy.aptCom.api.dto.response.ErrorMessage;
import com.ssafy.aptCom.api.dto.response.SuccessMessage;
import com.ssafy.aptCom.api.service.ApartmentService;
import com.ssafy.aptCom.api.service.FirebaseService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.db.entity.Bill;
import com.ssafy.aptCom.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Api(value = "관리자 API", tags = {"admin"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private ApartmentService apartmentService;

    @Autowired
    private UserService userService;

    @Autowired
    private FirebaseService firebaseService;

    @GetMapping("/bill")
    @ApiOperation(value = "고지서 이미지 리스트 조회", notes = "S3의 고지서 이미지 리스트를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> billImgList() {

        List<Bill> billImgList;

        try {
            billImgList = apartmentService.getBillList();
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 고지서 리스트 조회 실패"));
        }

        return ResponseEntity.status(200).body(BillListDto.of(billImgList));

    }

    @PostMapping("/bill")
    @ApiOperation(value = "고지서 승인", notes = "고지서 승인 후 S3의 이미지는 삭제하고 유저 정보를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> billApproval(
            @RequestBody BillApprovalRequestDto billApprovalRequestDto) {

        User user = userService.getUserByKakaoUserNumber(billApprovalRequestDto.getKakaoId());

        try {
            apartmentService.billApproval(billApprovalRequestDto, user);

            // firebase에 도로명 주소 포함 유저정보 저장
            String aptId = String.valueOf(billApprovalRequestDto.getAptId());
            String dong = billApprovalRequestDto.getDong();
            String ho = billApprovalRequestDto.getHo();
            String familyId = aptId + "-" + dong + "-" + ho;
            String userId = String.valueOf(user.getId());
//            String userId = String.valueOf(1); => login 대체
            String doroJuso = billApprovalRequestDto.getDoroJuso();
            firebaseService.insertFamilyMember(familyId, userId, doroJuso);

        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 고지서 승인 실패"));
        }


        return ResponseEntity.status(200).body(SuccessMessage.of("승인 성공했습니다."));

    }

    @DeleteMapping("/bill")
    @ApiOperation(value = "고지서 반려", notes = "고지서 반려 후 S3의 이미지는 삭제하고 유저 정보를 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> billRejection(
            @RequestBody BillRejectionRequestDto billRejectionRequestDto) {

        User user = userService.getUserByKakaoUserNumber(billRejectionRequestDto.getKakaoId());

        try {
            apartmentService.billRejection(billRejectionRequestDto, user);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(500).body(ErrorMessage.of(500, "Internal Server Error, 고지서 반려 실패"));
        }

        return ResponseEntity.status(200).body(SuccessMessage.of("반려했습니다."));

    }

}
