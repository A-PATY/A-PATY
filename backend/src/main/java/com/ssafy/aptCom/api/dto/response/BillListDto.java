package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Bill;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BillListDto {

    List<Bill> bills;

    public static BillListDto of(List<Bill> billList) {

        BillListDto res = new BillListDto();
        res.setBills(billList);

        return res;

    }

}
