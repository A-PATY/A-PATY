package com.ssafy.aptCom.api.dto.response;

import lombok.Getter;

@Getter
public class ArticleResponseDto {
    final String message;

    public ArticleResponseDto(String msg) {
        this.message = msg;
    }
}
