package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.CommunityJoinRequestDto;
import com.ssafy.aptCom.db.entity.Apartment;
import com.ssafy.aptCom.db.entity.User;

import java.io.IOException;
import java.util.List;

public interface ApartmentService {

    List<Apartment> getApartmentList(User user);

    void saveNoticeImage(CommunityJoinRequestDto communityJoinRequestDto, String kakaoUserNumber) throws IOException;
    
}
