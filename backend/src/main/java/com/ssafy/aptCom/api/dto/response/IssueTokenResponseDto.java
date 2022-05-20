package com.ssafy.aptCom.api.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel("IssueTokenResponseDto")
@Getter
@Setter
public class IssueTokenResponseDto {

    @ApiModelProperty(name = "access-token", example = "akslndasujndoiw.asdfnjdaifnklfegsg2134.fsdfsadfsd")
    private String accessToken;

    @ApiModelProperty(name = "refresh-token", example = "akslndasujndoiw.asdfnjdaifnklfegsg2134.fsdfsadfsd")
    private String refreshToken;

    public static IssueTokenResponseDto of(String accessToken, String refreshToken) {
        IssueTokenResponseDto res = new IssueTokenResponseDto();

        res.setAccessToken(accessToken);
        res.setRefreshToken(refreshToken);

        return res;
    }

}
