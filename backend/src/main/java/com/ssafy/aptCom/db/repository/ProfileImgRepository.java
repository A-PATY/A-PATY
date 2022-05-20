package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.ProfileImg;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImgRepository extends JpaRepository<ProfileImg, Integer> {

    ProfileImg findById(int profileImgId);

}
