package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<Auth, Long> {

    Optional<Auth> findByUserId(int userId);

}
