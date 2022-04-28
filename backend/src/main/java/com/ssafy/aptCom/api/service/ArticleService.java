package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ArticleService {

    List<String> saveArticleImages(List<MultipartFile> multipartFiles) throws IOException;

    String saveArticleImage(MultipartFile multipartFile) throws IOException;

    String createStoreFilename(String originalFilename);

    String extractExt(String originalFilename);

    void createArticle(ArticleRequestDto articleRequestDto);
}
