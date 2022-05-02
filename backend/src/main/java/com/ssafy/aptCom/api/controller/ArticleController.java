package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.service.ArticleServiceImpl;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@Api(value = "게시글 API", tags = {"article"})
@RestController
@RequestMapping("/api/v1/board")
public class ArticleController {

    ArticleServiceImpl articleService;

    public ArticleController(ArticleServiceImpl articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public ResponseEntity<?> createArticle(ArticleRequestDto articleRequestDto) throws IOException {

        List<MultipartFile> multipartFiles = articleRequestDto.getImgFiles();

        try {
            Integer articleId = articleService.createArticle(articleRequestDto);
            if (multipartFiles != null) {
                articleService.saveArticleImages(multipartFiles, articleId) ;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(201).body("created");
    }

//    @GetMapping
//    public ResponseEntity<?> getArticle(ArticleRequestDto articleRequestDto) throws IOException {
//
//        List<MultipartFile> multipartFiles = articleRequestDto.getImgFiles();
//
//        articleService.saveArticleImages(multipartFiles);
//        articleService.createArticle(articleRequestDto);
//
//        return ResponseEntity.status(201).body("created");
//    }
//
//    @PutMapping
//    public ResponseEntity<?> updateArticle(ArticleRequestDto articleRequestDto) throws IOException {
//
//        List<MultipartFile> multipartFiles = articleRequestDto.getImgFiles();
//
//        articleService.saveArticleImages(multipartFiles);
//        articleService.createArticle(articleRequestDto);
//
//        return ResponseEntity.status(201).body("created");
//    }
//
//    @DeleteMapping
//    public ResponseEntity<?> deleteArticle(ArticleRequestDto articleRequestDto) throws IOException {
//
//        List<MultipartFile> multipartFiles = articleRequestDto.getImgFiles();
//
//        articleService.saveArticleImages(multipartFiles);
//        articleService.createArticle(articleRequestDto);
//
//        return ResponseEntity.status(201).body("created");
//    }
}
