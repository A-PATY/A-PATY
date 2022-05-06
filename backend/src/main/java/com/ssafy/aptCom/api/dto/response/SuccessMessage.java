package com.ssafy.aptCom.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SuccessMessage")
public class SuccessMessage {

    @ApiModelProperty(name="응답 메시지", example = "정상")
    String message = null;

    public static SuccessMessage of(String message) {

        SuccessMessage res = new SuccessMessage();
        res.setMessage(message);

        return res;

    }

}
