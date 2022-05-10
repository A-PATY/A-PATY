package com.ssafy.aptCom.api.dto.request;

import com.ssafy.aptCom.db.entity.Apartment;
import com.ssafy.aptCom.db.entity.ProfileImg;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(value = "회원 정보 수정", description = "닉네임, 프로필 이미지 ID, 주소, 가족찾기여부 등 회원 정보 수정과 관련된 클래스")
public class CommunityJoinRequestDto {

    @ApiModelProperty(value = "고지서 사진")
    private MultipartFile image;

    @ApiModelProperty(value = "아파트 ID", example = "1")
    private int aptId;

    @ApiModelProperty(value = "아파트 이름", example = "장미 아파트")
    private String aptName;

    @ApiModelProperty(value = "아파트 동", example = "1")
    private String dong;

    @ApiModelProperty(value = "아파트 호", example = "101")
    private String ho;

    @ApiModelProperty(value = "도로명 주소", example = "장미로 32")
    private String doroJuso;

}
