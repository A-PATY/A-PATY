package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.dto.request.ArticleUpdateRequestDto;
import com.ssafy.aptCom.api.dto.response.ErrorMessage;
import com.ssafy.aptCom.api.service.ArticleServiceImpl;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.UserRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
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
    UserService userService;

    public ArticleController(ArticleServiceImpl articleService, UserRepository userRepository, UserService userService) {
        this.articleService = articleService;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @ApiOperation(value = "게시글 작성", notes = "게시판 게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "작성 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createArticle(@AuthenticationPrincipal String loginUser, ArticleRequestDto articleRequestDto) throws IOException {

        List<MultipartFile> multipartFiles = articleRequestDto.getImg();
        log.info("multipartFiles : {} ", multipartFiles);
        User user = userService.getUserByKakaoUserNumber(loginUser);

        try {
            Integer articleId = articleService.createArticle(articleRequestDto, user);
            if (multipartFiles != null) {
                articleService.saveArticleImages(multipartFiles, articleId) ;
            }
        } catch (Exception e) {
            log.info("exception: {}", e.getClass());
            return ResponseEntity.status(500).body(ErrorMessage.of( 500, "Internal Server Error"));

        }

        return ResponseEntity.status(200).body(ErrorMessage.of(200, "글 작성이 완료되었습니다."));
    }

    @ApiOperation(value = "게시글 수정", notes = "게시판 게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "수정 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
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
            return ResponseEntity.status(500).body(ErrorMessage.of( 500, "Internal Server Error"));
        }

        return ResponseEntity.status(200).body(ErrorMessage.of(200, "수정이 완료되었습니다."));
    }

    @ApiOperation(value = "게시글 삭제", notes = "게시판 게시글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "삭제 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @DeleteMapping("/{article-id}")
    public ResponseEntity<?> deleteArticle(@PathVariable("article-id") Integer articleId) throws IOException {

        try {
            articleService.deleteArticle(articleId);
        } catch (Exception e) {
            log.info("exception: {}", e.getClass());
            return ResponseEntity.status(500).body(ErrorMessage.of( 500, "Internal Server Error"));
        }

        return ResponseEntity.status(200).body(ErrorMessage.of(200, "게시글이 삭제되었습니다."));
    }
}
