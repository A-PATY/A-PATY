package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Likes;
import com.ssafy.aptCom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Integer> {

    Optional<Likes> findLikesByArticleAndUser(Article article, User user);

    void deleteByUserId(int userId);

    @Transactional
    @Modifying
    @Query("delete from Likes l where l.user = :id")
    void deleteAllByUserId(@Param("id") int id);

}
