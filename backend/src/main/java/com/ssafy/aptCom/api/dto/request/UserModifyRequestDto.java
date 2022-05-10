package com.ssafy.aptCom.api.dto.request;

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
@ApiModel(value = "회원 정보 수정", description = "닉네임, 프로필 이미지 ID, 주소, 가족찾기여부 등 회원 정보 수정과 관련된 클래스")
public class UserModifyRequestDto {

    @ApiModelProperty(value = "닉네임", example = "장미")
    private String nickName;

    @ApiModelProperty(value = "프로필 이미지 ID", example = "1")
    private int profileImgId;

    @ApiModelProperty(value = "주소코드", example = "4113510900")
    private String address;

    @ApiModelProperty(value = "가족찾기 여부", example = "true")
    private boolean findFamily;

}
