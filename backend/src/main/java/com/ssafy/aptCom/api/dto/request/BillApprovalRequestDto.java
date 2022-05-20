package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel(value = "BillApprovalRequestDto", description = "고지서 승인 정보를 입력하는 클래스")
@Setter
@Getter
public class BillApprovalRequestDto {

    @ApiModelProperty(value = "고지서 이미지 주소", example = "https://S3주소/22111234_1_장미아파트_1_202_장미로21.jpg")
    private String billImg;

    @ApiModelProperty(value = "아파트 ID", example = "1")
    private int aptId;

    @ApiModelProperty(value = "동", example = "1")
    private String dong;

    @ApiModelProperty(value = "호", example = "100")
    private String ho;

    @ApiModelProperty(value = "도로명 주소", example = "장미로 31")
    private String doroJuso;

    @ApiModelProperty(value = "카카오 회원번호", example = "2211234")
    private String kakaoId;

}
