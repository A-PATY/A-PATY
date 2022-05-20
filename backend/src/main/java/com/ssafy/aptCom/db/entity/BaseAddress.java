package com.ssafy.aptCom.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BaseAddress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 25)
    private String sidoName;

    @Column(length = 25)
    private String gugunName;

    @Column(length = 25)
    private String dongName;

    @Column(length = 25)
    private String riName;

    @Column(length = 25)
    private String address;

    @Builder
    public BaseAddress(String sidoName, String gugunName, String dongName, String riName) {
        this.sidoName = sidoName;
        this.gugunName = gugunName;
        this.dongName = dongName;
        this.riName = riName;
    }

}
