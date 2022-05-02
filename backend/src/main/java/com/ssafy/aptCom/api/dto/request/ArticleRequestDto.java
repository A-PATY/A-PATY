package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@ApiModel("ArticleResponseDto")
@Setter
@Getter
public class ArticleRequestDto {

    private int communityId;

    private int categoryId;

    private String title;

    private String contents;

    List<MultipartFile> imgFiles;

    private String contact;

    private Boolean isDone;

}
