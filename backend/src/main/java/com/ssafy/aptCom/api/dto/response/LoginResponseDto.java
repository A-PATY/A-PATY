package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@ApiModel("LoginResponseDto")
@Getter
@Setter
public class LoginResponseDto {

    @ApiModelProperty(name = "access-token", example = "akslndasujndoiw.asdfnjdaifnklfegsg2134.fsdfsadfsd")
    private String accessToken;

    @ApiModelProperty(name = "refresh-token", example = "akslndasujndoiw.asdfnjdaifnklfegsg2134.fsdfsadfsd")
    private String refreshToken;

    @ApiModelProperty(name = "is-new", example = "true or false")
    private boolean newMember;

    public static LoginResponseDto of(String[] tokens, boolean isNew) {
        LoginResponseDto res = new LoginResponseDto();

        res.setAccessToken(tokens[0]);
        res.setRefreshToken(tokens[1]);
        res.setNewMember(isNew);

        return res;
    }

}
