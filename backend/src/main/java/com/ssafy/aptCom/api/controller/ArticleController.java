package com.ssafy.aptCom.api.controller;

import com.google.firebase.database.annotations.Nullable;
import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.dto.request.ArticleUpdateRequestDto;
import com.ssafy.aptCom.api.dto.response.ArticleResponseDto;
import com.ssafy.aptCom.api.service.ArticleServiceImpl;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.UserRepository;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
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
    UserRepository userRepository;

    public ArticleController(ArticleServiceImpl articleService, UserRepository userRepository) {
        this.articleService = articleService;
        this.userRepository = userRepository;
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createArticle(ArticleRequestDto articleRequestDto) throws IOException {

        List<MultipartFile> multipartFiles = articleRequestDto.getImg();
        log.info("multipartFiles : {} ", multipartFiles);
//        User user = userRepository.findByKakaoUserNumber(kakao).orElseThrow();
        User user = userRepository.getOne(1);

        try {
            Integer articleId = articleService.createArticle(articleRequestDto, user);
            if (multipartFiles != null) {
                articleService.saveArticleImages(multipartFiles, articleId) ;
            }
        } catch (Exception e) {
            log.info("exception: {}", e);
            log.info("exception: {}", e.getClass());
        }

        return ResponseEntity.status(201).body(new ArticleResponseDto("글 작성이 완료되었습니다."));
    }

    @PutMapping(value ="/{article-id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateArticle(@PathVariable("article-id") Integer articleId, ArticleUpdateRequestDto articleUpdateRequestDto) throws IOException {


        List<MultipartFile> multipartFiles = articleUpdateRequestDto.getImg();
        log.info("multipartFiles : {} ", multipartFiles);

        try {
            articleService.deleteArticleImagesS3(articleId);
            articleService.deleteArticleImagesDB(articleId);

            if (multipartFiles != null) {
                articleService.saveArticleImages(multipartFiles, articleId);
            }

            articleService.updateArticle(articleId, articleUpdateRequestDto);
        } catch (Exception e) {
            log.info("exception: {}", e.getClass());
        }

        return ResponseEntity.status(200).body(new ArticleResponseDto("수정이 완료되었습니다."));
    }

    @DeleteMapping("/{article-id}")
    public ResponseEntity<?> deleteArticle(@PathVariable("article-id") Integer articleId) throws IOException {

        try {
            articleService.deleteArticle(articleId);
        } catch (Exception e) {
            log.info(e.getMessage());
            log.info(String.valueOf(e.getClass()));

            return ResponseEntity.status(404).body(new ArticleResponseDto("게시글을 찾을 수 없습니다."));
        }

        return ResponseEntity.status(200).body(new ArticleResponseDto("게시글이 삭제되었습니다."));
    }
}
