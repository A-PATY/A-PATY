package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@ApiModel("ArticleRequestDto")
@Setter
@Getter
public class ArticleRequestDto {

    private int communityId;

    private String category;

    private String title;

    private String contents;

    ArrayList<MultipartFile> img;

    private String contact;

    private Boolean isDone;

}
