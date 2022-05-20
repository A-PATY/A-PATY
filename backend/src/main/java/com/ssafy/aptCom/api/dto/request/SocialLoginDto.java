package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "소셜 로그인", description = "Access Code를 입력하는 클래스")
public class SocialLoginDto {

    @ApiModelProperty(value = "Access Code", example = "sdfghlkjhw3k1123hzxcv2=")
    private String accessCode;

    private boolean testMode;

}
