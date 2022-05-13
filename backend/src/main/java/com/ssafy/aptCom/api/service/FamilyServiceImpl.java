package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.response.FamilyDto;
import com.ssafy.aptCom.api.dto.response.FamilyInterface;
import com.ssafy.aptCom.db.repository.FamilyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FamilyServiceImpl implements FamilyService {

    @Autowired
    private FamilyRepository familyRepository;

    public List<FamilyDto> getFamilyList(int aptId, String dong, String ho){

        List<FamilyInterface> list = familyRepository.findFamilyInfo(aptId, dong, ho).orElse(null);
        List<FamilyDto> familyList = new ArrayList<>();

        if(list != null){
            for(FamilyInterface family : list) {

                FamilyDto dto = FamilyDto.builder()
                        .userId(family.getUserId())
                        .userName(family.getUserName())
                        .nickname(family.getNickname())
                        .profileImgUrl(family.getProfileImgUrl())
                        .findFamily(family.getFindFamily())
                        .build();

                familyList.add(dto);
            }
        }

        return familyList;
    }
}
