package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    void deleteAllByArticleId(Integer articleId);

    @Query(value = "SELECT img_url FROM image AS i WHERE i.article_id = :articleId", nativeQuery = true)
    List<String> findAllImgUrlByArticleId(Article articleId);
}
