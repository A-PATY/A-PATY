package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Integer> {

    Community findCommunityByCommunityCode(String code);

    List<Community> findAllByCommunityCode(String communityCode);

}
