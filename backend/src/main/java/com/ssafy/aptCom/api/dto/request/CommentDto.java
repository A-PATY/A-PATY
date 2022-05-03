package com.ssafy.aptCom.api.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "댓글 정보", description = "댓글 입력하는 클래스")
public class CommentDto {

    @ApiModelProperty(value = "댓글 내용", example = "댓글입니다")
    private String contents;

    @ApiModelProperty(value = "비밀여부", example = "true")
    private boolean secret;

}
