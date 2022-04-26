package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Community;
import com.ssafy.aptCom.db.entity.UserCommunity;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserCommunityDto {

    private int communityId;

    private String communityType;

    private String communityType2;

    public static List<UserCommunityDto> of(List<UserCommunity> userCommunities) {
        List<UserCommunityDto> res = new ArrayList<>();

        for (UserCommunity userCommunity : userCommunities) {
            Community community = userCommunity.getCommunity();

            UserCommunityDto userCommunityDto = new UserCommunityDto();
            userCommunityDto.setCommunityId(community.getId());
            userCommunityDto.setCommunityType(community.getCommunityType());
            userCommunityDto.setCommunityType2(community.getCommunityType2());
            res.add(userCommunityDto);
        }

        return res;

    }

}
