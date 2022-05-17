package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Long> {

    Optional<Auth> findByUserId(int userId);

    Optional<Auth> findByRefreshToken(String refreshToken);

    List<Auth> findAllByUserId(int userId);

    @Transactional
    @Modifying
    @Query("delete from Auth a where a.user = :id")
    void deleteAllByUserId(@Param("id") int id);

}
