package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserInfoDto {

    private int userId;

    private String nickname;

    List<UserCommunityDto> CommunityList = new ArrayList<>();

    private String sidoName;

    private String gugunName;

    private String dongName;

    private String aptName;

    private String dong;

    private String ho;

    private int profileImgId;

    private boolean findFamily;

    public static UserInfoDto of(User user) {
        UserInfoDto res = new UserInfoDto();

        BaseAddress address = user.getBaseAddress();
        Apartment apt = user.getApartment();
        ProfileImg profileImg = user.getProfileImg();

        res.setUserId(user.getId());
        res.setNickname(user.getNickname());
        res.setCommunityList(UserCommunityDto.of(user.getUserCommunities()));
        res.setSidoName(address.getSidoName());
        res.setGugunName(address.getGugunName());
        res.setDongName(address.getDongName());
        res.setAptName(apt.getAptName());
        res.setDong(user.getDong());
        res.setHo(user.getHo());
        res.setProfileImgId(profileImg.getId());
        res.setFindFamily(user.isFindFamily());

        return res;
    }

}
