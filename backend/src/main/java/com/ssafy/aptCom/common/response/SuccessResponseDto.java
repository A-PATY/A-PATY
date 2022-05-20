package com.ssafy.aptCom.common.response;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@ApiModel("SuccessMessageBody")
public class SuccessResponseDto {

    @ApiModelProperty(name="응답 메시지", example = "완료 되었습니다.")
    String message = null;

    public static SuccessResponseDto of(String message) {

        SuccessResponseDto res = new SuccessResponseDto();
        res.setMessage(message);
        return res;

    }
}