package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class UserInfoDto {

    private int userId;

    private String nickname;

    List<UserCommunityDto> communityList = new ArrayList<>();

    private String sidoName;

    private String gugunName;

    private String dongName;

    private String aptName;

    private String dong;

    private String ho;

    private int profileImgId;

    private boolean findFamily;

    private String role;

    private String billStatus;

    public static UserInfoDto of(User user) {

        if (user.getUserCommunities().size() > 0) {
            UserInfoDto res = new UserInfoDto();

            Optional<BaseAddress> address = Optional.ofNullable(user.getBaseAddress());
            Optional<Apartment> apt = Optional.ofNullable(user.getApartment());
            Optional<ProfileImg> profileImg = Optional.ofNullable(user.getProfileImg());

            res.setUserId(user.getId());
            res.setNickname(user.getNickname());
            res.setCommunityList(UserCommunityDto.of(user.getUserCommunities()));
            res.setSidoName(address.orElse(new BaseAddress(null, null, null)).getSidoName());
            res.setGugunName(address.orElse(new BaseAddress(null, null, null)).getGugunName());
            res.setDongName(address.orElse(new BaseAddress(null, null, null)).getDongName());
            res.setAptName(apt.orElse(new Apartment(null)).getAptName());
            res.setDong(user.getDong());
            res.setHo(user.getHo());
            res.setProfileImgId(profileImg.get().getId());
            res.setFindFamily(user.isFindFamily());
            res.setRole(user.getRoles());
            res.setBillStatus(user.getBillStatus());

            return res;

        } else {
            return null;
        }
    }

}
