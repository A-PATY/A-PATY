package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.ProfileImg;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProfileImgListDto {

    List<ProfileImgList> profileImgList;

    public static ProfileImgListDto of(List<ProfileImg> profileImgList) {

        ProfileImgListDto res = new ProfileImgListDto();
        res.setProfileImgList(ProfileImgList.of(profileImgList));

        return res;
    }

}
