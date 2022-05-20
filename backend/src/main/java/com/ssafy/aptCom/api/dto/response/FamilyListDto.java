package com.ssafy.aptCom.api.dto.response;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyListDto {

    private String familyId;

    private List<FamilyDto> familyList = new ArrayList<>();

    public static FamilyListDto of(String familyId, List<FamilyDto> familyList) {

        FamilyListDto res = new FamilyListDto();
        res.setFamilyId(familyId);
        res.setFamilyList(familyList);

        return res;
    }

}
