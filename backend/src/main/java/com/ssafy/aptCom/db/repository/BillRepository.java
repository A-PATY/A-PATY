package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Integer> {

    void deleteByBillImg(String billImg);

}
