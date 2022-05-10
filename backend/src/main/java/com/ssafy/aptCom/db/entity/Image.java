package com.ssafy.aptCom.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;

    @Column(length = 200)
    private String imgUrl;

}
