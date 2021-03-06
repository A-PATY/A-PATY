package com.ssafy.aptCom.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Auth {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String refreshToken;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Auth(String refreshToken, User user) {
        this.refreshToken = refreshToken;
        this.user = user;
    }

    public void refreshUpdate(String refreshToken) {
        this.refreshToken = refreshToken;
    }

}
