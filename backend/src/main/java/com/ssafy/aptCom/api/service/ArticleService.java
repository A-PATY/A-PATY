package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.dto.response.ArticleDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ArticleService {

    List<String> saveArticleImages(List<MultipartFile> multipartFiles, Integer articleId) throws IOException;

    String saveArticleImage(MultipartFile multipartFile, Integer articleId) throws IOException;

    String createStoreFilename(String originalFilename);

    String extractExt(String originalFilename);

    Integer createArticle(ArticleRequestDto articleRequestDto);

//    void getArticle(ArticleRequestDto articleRequestDto);
//
//    void updateArticle(ArticleRequestDto articleRequestDto);
//
//    void deleteArticle(ArticleRequestDto articleRequestDto);

    Article getArticle(Integer articleId);

    List<ArticleDto> getArticles(
            User user, int communityId, int lastArticleId, int size,
            int categoryId, String keyword
    );

    boolean updateArticleViews(Article article);
}
