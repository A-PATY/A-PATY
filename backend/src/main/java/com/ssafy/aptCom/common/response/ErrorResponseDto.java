package com.ssafy.aptCom.common.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ErrorResponseDto")
public class ErrorResponseDto {

    @ApiModelProperty(name="응답 메시지", example = "확인해주세요.")
    String message = null;

    @ApiModelProperty(name="응답 코드", example = "401")
    Integer status = null;

    public ErrorResponseDto() {}

    public static ErrorResponseDto of(Integer statusCode, String message) {

        ErrorResponseDto body = new ErrorResponseDto();
        body.message = message;
        body.status = statusCode;
        return body;

    }
}