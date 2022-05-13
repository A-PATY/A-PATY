package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Community;
import com.ssafy.aptCom.db.entity.UserCommunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCommunityRepository extends JpaRepository<UserCommunity, Long> {

    void deleteByCommunity(Community community);

    void deleteByUserId(int userId);

}
