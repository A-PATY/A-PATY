package com.ssafy.aptCom.db.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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

    @ManyToOne(targetEntity = Apartment.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "apt_id")
    private Apartment apartment;

    @ManyToOne(targetEntity = BaseAddress.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "base_address_id")
    private BaseAddress baseAddress;

    @ManyToOne(targetEntity = ProfileImg.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "profile_img_id")
    private ProfileImg profileImg;

    @Column(length = 25)
    private String userName;

    @Column(length = 25)
    private String kakaoUserNumber;

    @Column(length = 25)
    private String nickname;

    @Column(columnDefinition = "varchar(25) default NULL")
    private String dong;

    @Column(columnDefinition = "varchar(25) default NULL")
    private String ho;

    @Column(columnDefinition = "boolean default false")
    private boolean findFamily;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(updatable = false, columnDefinition = "varchar(10) default 'USER'")
    private String roles; // USER, ADMIN

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();

    }

    @OneToMany
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    List<UserCommunity> userCommunities = new ArrayList<>();

    @Column(length = 25)
    private String billStatus;

}