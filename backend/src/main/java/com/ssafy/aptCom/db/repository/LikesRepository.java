package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Likes;
import com.ssafy.aptCom.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Integer> {

    Optional<Likes> findLikesByArticleAndUser(Article article, User user);

    void deleteByUserId(int userId);

}
