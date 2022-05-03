package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.dto.request.ArticleUpdateRequestDto;
import com.ssafy.aptCom.api.service.ArticleServiceImpl;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.UserRepository;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    UserRepository userRepository;

    public ArticleController(ArticleServiceImpl articleService, UserRepository userRepository) {
        this.articleService = articleService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<?> createArticle(@AuthenticationPrincipal String kakao, ArticleRequestDto articleRequestDto) throws IOException {

        List<MultipartFile> multipartFiles = articleRequestDto.getImg();
        User user = userRepository.findByKakaoUserNumber(kakao).orElseThrow();

        try {
            Integer articleId = articleService.createArticle(articleRequestDto, user);
            if (multipartFiles != null) {
                articleService.saveArticleImages(multipartFiles, articleId) ;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.status(201).body("created");
    }

    @PutMapping("/{article-id}")
    public ResponseEntity<?> updateArticle(@PathVariable("article-id") Integer articleId, ArticleUpdateRequestDto articleUpdateRequestDto) throws IOException {


        List<MultipartFile> multipartFiles = articleUpdateRequestDto.getImg();

        articleService.updateArticleImages(multipartFiles, articleId);
        articleService.updateArticle(articleId, articleUpdateRequestDto);

        return ResponseEntity.status(201).body("updated");
    }

    @DeleteMapping("/{article-id}")
    public ResponseEntity<?> deleteArticle(@PathVariable("article-id") Integer articleId) throws IOException {

        try {
            articleService.deleteArticle(articleId);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(404).body("no article");
        }

        return ResponseEntity.status(200).body("deleted");
    }
}
