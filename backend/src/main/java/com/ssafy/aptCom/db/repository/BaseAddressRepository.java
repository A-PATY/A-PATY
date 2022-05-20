package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.BaseAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BaseAddressRepository extends JpaRepository<BaseAddress, Integer> {

    BaseAddress findByAddress(String address);

}
