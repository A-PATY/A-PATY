package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Community;
import com.ssafy.aptCom.db.entity.UserCommunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserCommunityRepository extends JpaRepository<UserCommunity, Long> {

    void deleteByCommunity(Community community);

    void deleteByUserId(int userId);

    @Transactional
    @Modifying
    @Query(value = "delete from UserCommunity where user_id = :id", nativeQuery = true)
    void deleteAllByUserId(@Param("id") int id);

}
