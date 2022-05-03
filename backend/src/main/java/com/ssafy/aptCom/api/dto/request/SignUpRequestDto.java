package com.ssafy.aptCom.api.dto.request;

import com.ssafy.aptCom.db.entity.BaseAddress;
import com.ssafy.aptCom.db.entity.ProfileImg;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value = "회원가입 입력 정보", description = "닉네임, 프로필 이미지 ID, 주소, 실명 등 회원 정보를 담는 클래스")
public class SignUpRequestDto {

    @ApiModelProperty(value = "닉네임", example = "장미")
    private String nickName;

    @ApiModelProperty(value = "프로필 이미지 ID", example = "1")
    private ProfileImg profileImgId;

    @ApiModelProperty(value = "주소코드", example = "4113510900")
    private String address;

    @ApiModelProperty(value = "실명", example = "김정미")
    private String name;

}
