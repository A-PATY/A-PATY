package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.reponse.UserResponseDto;

public interface FirebaseService {
    public String insertMember(Member member) throws Exception;
    public Member getMemberDetail(String id) throws Exception;
}
