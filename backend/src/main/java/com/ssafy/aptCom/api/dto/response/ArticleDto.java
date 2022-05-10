package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Article;

import com.ssafy.aptCom.db.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleDto {

    private int articleId;

    private String category;

    private String title;

    private String contents;

    List<ImageDto> imgs = new ArrayList<>();

    private String contact;

    private boolean doneyn;

    private int views;

    private int likes;

    private boolean likeyn;

    private String createdAt;

    private int authorId;

    private String author;

    private int commentCount;

    private String profileImgUrl;

    List<CommentResponseDto> commentsList = new ArrayList<>();

    public static ArticleDto of(Article article, boolean likeYn) {

        ArticleDto res = new ArticleDto();

        res.setArticleId(article.getId());
        res.setCategory(article.getCategory().getCategoryName());
        res.setTitle(article.getTitle());
        res.setContents(article.getContents());
        res.setImgs(ImageDto.of(article.getImages()));

        res.setContact(article.getContact());
        res.setDoneyn(article.getIsDone());
        res.setViews(article.getViews());
        res.setLikes(article.getLikes().size());
        res.setLikeyn(likeYn);

        String createdAt = String.valueOf(article.getCreatedAt()).replace("T"," ");
        if(createdAt.length()>16) createdAt = createdAt.substring(0,16);
        res.setCreatedAt(createdAt);

        // 커뮤니티 타입에 따라 article의 Author 사용자명 변경
        String type1 = article.getCommunity().getCommunityType();
        String type2 = article.getCommunity().getCommunityType2();
        User user = article.getUser();

        res.setAuthorId(user.getId());

        if(type1.equals("지역")){
            article.setAnonyAuthor(article.getUser().getNickname());
        } else {
            if(type2.equals("전체")) {
                article.setAnonyAuthor(user.getDong() + "동 " + user.getHo() +"호 " + user.getNickname());
            }
        }
        res.setAuthor(article.getAnonyAuthor());

        res.setCommentCount(article.getComments().size());
        res.setProfileImgUrl(article.getUser().getProfileImg().getProfileImgUrl());
        res.setCommentsList(CommentResponseDto.of(article.getComments()));

        return res;
    }

}
