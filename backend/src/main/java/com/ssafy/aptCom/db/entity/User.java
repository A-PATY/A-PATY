package com.ssafy.aptCom.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = Apartment.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_id")
    private Apartment apartment;

    @ManyToOne(targetEntity = BaseAddress.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "base_address_id")
    private BaseAddress baseAddress;

    @ManyToOne(targetEntity = ProfileImg.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_img_id")
    private ProfileImg profileImg;

    @Column(length = 25)
    private String accessCode;

    @Column(length = 25)
    private String userName;

    @Column(length = 25)
    private String email;

    @Column(length = 25)
    private String nickname;

    @Column(length = 25)
    private String dong;

    @Column(length = 25)
    private String ho;

    @Column(columnDefinition = "boolean default false")
    private boolean findFamily;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}