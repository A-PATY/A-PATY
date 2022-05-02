package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
}
