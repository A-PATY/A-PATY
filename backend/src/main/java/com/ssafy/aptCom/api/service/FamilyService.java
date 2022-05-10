package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.response.FamilyDto;

import java.util.List;

public interface FamilyService {

    List<FamilyDto> getFamilyList(int userId, int aptId, String dong, String ho);
}
