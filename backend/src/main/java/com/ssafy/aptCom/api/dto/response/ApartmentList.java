package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Apartment;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ApartmentList {

    private int aptId;

    private String aptName;

    public static List<ApartmentList> of(List<Apartment> apartments) {
        List<ApartmentList> res = new ArrayList<>();

        for (Apartment apartment : apartments) {
            ApartmentList apartmentList = new ApartmentList();
            apartmentList.setAptId(apartment.getId());
            apartmentList.setAptName(apartment.getAptName());
            res.add(apartmentList);
        }

        return res;

    }

}
