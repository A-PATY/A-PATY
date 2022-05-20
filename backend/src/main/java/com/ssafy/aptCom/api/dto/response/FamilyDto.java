package com.ssafy.aptCom.api.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyDto {

    private int  userId;

    private String userName;

    private String nickname;

    private String profileImgUrl;

    private boolean findFamily;

}
