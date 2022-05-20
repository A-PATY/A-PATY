package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    @Modifying
    void deleteAllImgByArticleId(@Param("articleId") Integer articleId);

    @Modifying
    void deleteImgByImgUrl(@Param("ImgUrl") String imgUrl);

    @Query(value = "SELECT img_url FROM image AS i WHERE i.article_id = :articleId", nativeQuery = true)
    List<String> findAllImgUrlByArticleId(@Param("articleId") Integer articleId);
}
