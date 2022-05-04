package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.ProfileImg;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProfileImgList {

    private int profileImgId;

    private String profileImgUrl;

    public static List<ProfileImgList> of(List<ProfileImg> profileImgs) {
        List<ProfileImgList> res = new ArrayList<>();

        for (ProfileImg profileImg : profileImgs) {
            ProfileImgList profileImgList = new ProfileImgList();
            profileImgList.setProfileImgId(profileImg.getId());
            profileImgList.setProfileImgUrl(profileImg.getProfileImgUrl());
            res.add(profileImgList);
        }

        return res;

    }

}
