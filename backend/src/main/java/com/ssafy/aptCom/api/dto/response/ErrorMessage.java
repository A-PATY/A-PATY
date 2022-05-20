package com.ssafy.aptCom.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ErrorMessage")
public class ErrorMessage {

    @ApiModelProperty(name="응답코드", example = "400")
    int status = 0;

    @ApiModelProperty(name="응답 메시지", example = "정상")
    String message = null;

    public static ErrorMessage of(int status, String message) {

        ErrorMessage res = new ErrorMessage();
        res.setStatus(status);
        res.setMessage(message);

        return res;

    }

}
