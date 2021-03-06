package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByKakaoUserNumber(String kakaoUserNumber);

}
