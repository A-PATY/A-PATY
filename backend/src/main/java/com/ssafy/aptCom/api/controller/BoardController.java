package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.dto.request.CommentDto;
import com.ssafy.aptCom.api.dto.response.ArticleListResponseDto;
import com.ssafy.aptCom.api.dto.response.ArticleDto;
import com.ssafy.aptCom.api.service.ArticleService;
import com.ssafy.aptCom.api.service.CommentService;
import com.ssafy.aptCom.api.service.LikesService;
import com.ssafy.aptCom.api.service.UserService;
import com.ssafy.aptCom.common.response.ErrorResponseDto;
import com.ssafy.aptCom.common.response.SuccessResponseDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Likes;
import com.ssafy.aptCom.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Api(value = "게시판 API", tags = {"board"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
public class BoardController {

    private final CommentService commentService;

    private final LikesService likesService;

    private final ArticleService articleService;

    private final UserService userService;

    @PostMapping("/{article-id}/comments")
    @ApiOperation(value = "댓글 저장", notes = "게시판 댓글을 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "저장 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> saveComment(
            @PathVariable("article-id") Integer articleId,
            @RequestBody CommentDto commentDto,
            @AuthenticationPrincipal String loginUser) {

        User user = userService.getUserByKakaoUserNumber(loginUser);

        Article article = new Article();
        article.setId(articleId);

        try {
            boolean isSaveComment = commentService.saveComment(article, commentDto, user);

            if (!isSaveComment) {
                return ResponseEntity.status(400).body(ErrorResponseDto.of(400,"입력값이 유효하지 않습니다."));
            }

        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,"Internal Server Error, 댓글 작성 실패"));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("댓글 작성이 완료되었습니다."));

    }

    @DeleteMapping("/{article-id}/comments/{comment-id}")
    @ApiOperation(value = "댓글 삭제", notes = "게시판 댓글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "삭제 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteComment(
            @PathVariable("comment-id") Integer commentId
    ){

        try {
            boolean isDeleteComment = commentService.deleteComment(commentId);

            if(!isDeleteComment) {
                return ResponseEntity.status(400).body(ErrorResponseDto.of(400,"입력값이 유효하지 않습니다."));
            }

        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,"Internal Server Error, 댓글 삭제 실패"));
        }
        return ResponseEntity.status(200).body(SuccessResponseDto.of("댓글 삭제가 완료되었습니다."));

    }

    @Transactional
    @ApiOperation(value = "좋아요 저장", notes = "게시판을 좋아요한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "저장 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @PostMapping("/{article-id}/like")
    public ResponseEntity<?> likeArticle(
        @PathVariable("article-id") Integer articleId,
        @AuthenticationPrincipal String loginUser
    ) {

        User user = userService.getUserByKakaoUserNumber(loginUser);

        Article article = new Article();
        article.setId(articleId);

        try {
            Likes likes = likesService.getLikesByArticleAndUser(article, user);
            boolean isSaveLikes;

            if(likes != null) {
                isSaveLikes = likesService.deleteLikes(likes.getId());
            } else {
                isSaveLikes= likesService.saveLikes(article, user);
            }

            if (!isSaveLikes) {
                return ResponseEntity.status(400).body(ErrorResponseDto.of(400,"입력값이 유효하지 않습니다."));
            }

        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,"Internal Server Error, 좋아요 실패"));

        }
        return ResponseEntity.status(200).body(SuccessResponseDto.of("좋아요 완료되었습니다."));
    }

    @Transactional
    @ApiOperation(value = "게시글 조회", notes = "게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping("/{article-id}")
    public ResponseEntity<?> getArticle(
            @PathVariable("article-id") Integer articleId,
            @AuthenticationPrincipal String loginUser
    ) {

        User user = userService.getUserByKakaoUserNumber(loginUser);

        Article article;
        Boolean likeYn;

        try {
            article = articleService.getArticle(articleId);
            if(article == null) {
                return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "입력값이 유효하지 않습니다."));
            }

            article.setViews(article.getViews()+1);
            articleService.updateArticleViews(article);

            Likes likes = likesService.getLikesByArticleAndUser(article, user);
            if(likes != null) likeYn = true;
            else likeYn =  false;

        } catch (Exception exception) {

            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,"Internal Server Error, 글 불러오기 실패"));
        }
        return ResponseEntity.status(200).body(ArticleDto.of(article, likeYn));
    }


    @ApiOperation(value = "게시판 목록 조회", notes = "게시판 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    @GetMapping
    public ResponseEntity<?> getArticleList(
            @RequestParam(value = "communityId", required = true) int communityId,
            @RequestParam(value = "categoryId", required = false) int categoryId,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "lastArticleId", required = true) int lastArticleId,
            @RequestParam(value = "size", required = true) int size,
            @AuthenticationPrincipal String loginUser
    ){

        User user = userService.getUserByKakaoUserNumber(loginUser);

        List<ArticleDto> articleDtoList;

        try {
            articleDtoList = articleService.getArticles(user, communityId, lastArticleId, size, categoryId, keyword);

        } catch (Exception e){
            //e.printStackTrace();
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,"Internal Server Error, 게시판 조회 실패"));
        }

        return ResponseEntity.status(200).body(ArticleListResponseDto.of(articleDtoList));
    }
}
