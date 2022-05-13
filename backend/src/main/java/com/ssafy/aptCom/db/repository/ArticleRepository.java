package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import org.springframework.stereotype.Repository;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    @Query(value = "select * from article a " +
            "where a.community_id = :communityId " +
            "and (a.id < :lastArticleId or :lastArticleId = 0) " +
            "and (a.category_id = :categoryId " +
            "   or :categoryId = 0) " +
            "and (a.contents like concat('%', :keyword, '%') " +
            "   or a.title like concat('%', :keyword, '%') " +
            "   or :keyword = '' or :keyword is null) " +
            "order by a.created_at desc " +
            "limit :size", nativeQuery = true)
    List<Article> findByIdIsLessThanOrderByCreatedAtDesc(
            @Param("communityId") int communityId,
            @Param("lastArticleId") int lastArticleId,
            @Param("categoryId") int categoryId,
            @Param("keyword") String keyword,
            @Param("size") int size);

    List<Article> findAllByUserId(int userId);

}
