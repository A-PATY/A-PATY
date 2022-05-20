package com.ssafy.aptCom.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // 지역 or 아파트
    @Column(length = 25)
    private String communityType;

    // 익명 or 전체
    @Column(length = 25)
    private String communityType2;

    // 세부코드 (지역 - 법정동코드 or 아파트 - 아파트코드)
    @Column(length = 25)
    private String communityCode;

}
