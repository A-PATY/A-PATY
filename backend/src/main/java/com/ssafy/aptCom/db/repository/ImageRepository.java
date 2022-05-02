package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {
}
