package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Comment;
import com.ssafy.aptCom.db.entity.User;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {

    private int commentId;

    private String commentWriter;

    private String commentContent;

    private String commentCreatedAt;

    private boolean secret;

    private int commentAuthorId;

    private String commentAuthor;

    private String profileImgUrl;

    public static List<CommentResponseDto> of(List<Comment> comments) {
        List<CommentResponseDto> res = new ArrayList<>();

        for (Comment comment : comments) {
            CommentResponseDto crd = new CommentResponseDto();

            crd.setCommentId(comment.getId());
            crd.setCommentWriter(comment.getUser().getNickname());
            crd.setCommentContent(comment.getCommentContent());

            String createdAt = String.valueOf(comment.getCommentCreatedAt()).replace("T"," ");
            if(createdAt.length()>16) createdAt = createdAt.substring(0, 16);
            crd.setCommentCreatedAt(createdAt);

            crd.setSecret(comment.isSecret());

            // 커뮤니티 타입에 따라 article의 Author 사용자명 변경
            String type1 = comment.getArticle().getCommunity().getCommunityType();
            String type2 = comment.getArticle().getCommunity().getCommunityType2();
            User user = comment.getUser();

            crd.setCommentAuthorId(user.getId());

            if(type1.equals("지역")){
                crd.setCommentAuthor(comment.getUser().getNickname());
            } else {
                if(type2.equals("전체")) {
                    crd.setCommentAuthor(user.getDong() + "동 " + user.getHo() +"호 " + user.getNickname());
                } else {
                    crd.setCommentAuthor(comment.getUser().getNickname());
                }
            }

            crd.setProfileImgUrl(comment.getUser().getProfileImg().getProfileImgUrl());
            res.add(crd);
        }

        return res;

    }

}
