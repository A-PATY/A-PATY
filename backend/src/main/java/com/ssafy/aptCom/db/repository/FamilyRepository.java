package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.api.dto.response.FamilyDto;
import com.ssafy.aptCom.api.dto.response.FamilyInterface;
import com.ssafy.aptCom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyRepository extends JpaRepository<User, Integer> {

    @Query(value = "select u.id as userId, " +
            "u.user_name as userName, " +
            "u.nickname as nickname, " +
            "pi.profile_img_url as profileImgUrl, " +
            "u.find_family as findFamily " +
            "from user u " +
            "left outer join profile_img pi " +
            "on u.profile_img_id = pi.id " +
            "where u.apt_id = :aptId " +
            "and u.dong = :dong " +
            "and u.ho = :ho", nativeQuery = true)
    Optional<List<FamilyInterface>> findFamilyInfo(
            @Param("aptId") int aptId,
            @Param("dong") String dong,
            @Param("ho") String ho);
}
