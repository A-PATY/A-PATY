package com.ssafy.aptCom.api.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArticleListResponseDto {

    List<ArticleDto> articles;

    public static ArticleListResponseDto of(List<ArticleDto> articles){

        ArticleListResponseDto res = new ArticleListResponseDto();
        res.setArticles(articles);
        return res;

    }


}
