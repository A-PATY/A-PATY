package com.ssafy.aptCom.api.dto.reponse;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
        public String date_of_birth;
        public String nickname;
    }
