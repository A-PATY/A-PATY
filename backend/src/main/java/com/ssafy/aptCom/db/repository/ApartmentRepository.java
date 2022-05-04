package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Apartment;
import com.ssafy.aptCom.db.entity.BaseAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApartmentRepository extends JpaRepository<Apartment, Integer> {

    List<Apartment> findAllByBaseAddress(BaseAddress baseAddress);

}
