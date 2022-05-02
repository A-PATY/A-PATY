package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Integer> {
}
