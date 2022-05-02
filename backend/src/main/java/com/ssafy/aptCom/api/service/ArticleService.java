package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
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
}
