package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel(value = "BillRejectionRequestDto", description = "고지서 반려 정보를 입력하는 클래스")
@Setter
@Getter
public class BillRejectionRequestDto {

    @ApiModelProperty(value = "고지서 이미지 주소", example = "https://S3주소/22111234_1_장미아파트_1_202_장미로21.jpg")
    private String billImg;

    @ApiModelProperty(value = "카카오 회원번호", example = "2211234")
    private String kakaoId;

}
