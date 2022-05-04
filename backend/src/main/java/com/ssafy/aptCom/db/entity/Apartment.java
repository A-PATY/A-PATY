package com.ssafy.aptCom.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 25)
    private String aptCode;

    @Column(length = 25)
    private String aptName;

    @ManyToOne(targetEntity = BaseAddress.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "base_address_id")
    private BaseAddress baseAddress;

}
