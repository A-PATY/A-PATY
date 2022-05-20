package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Apartment;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApartmentListDto {

    List<ApartmentList> aptList;

    public static ApartmentListDto of(List<Apartment> apartmentList) {

        ApartmentListDto res = new ApartmentListDto();
        res.setAptList(ApartmentList.of(apartmentList));

        return res;

    }

}
