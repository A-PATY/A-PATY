package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponseDto {

    private UserInfoDto userInfo;

    public static UserInfoResponseDto of(User user) {
        UserInfoResponseDto res = new UserInfoResponseDto();

        res.setUserInfo(UserInfoDto.of(user));

        return res;

    }

}
