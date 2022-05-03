package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@ApiModel("ArticleRequestDto")
@Setter
@Getter
public class ArticleUpdateRequestDto {
    private String category;

    private String title;

    private String contents;

    List<MultipartFile> img;

    private String contact;

    private Boolean isDone;
}
