package com.ssafy.aptCom.db.entity;

import lombok.*;

import javax.annotation.Nullable;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Article extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Nullable
    @ManyToOne(targetEntity = Community.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    private Community community;

    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(length = 25)
    private String anonyAuthor;

    @Nullable
    @Column(length = 80)
    private String title;

    @Nullable
    @Column(length = 1000)
    private String contents;

    @Nullable
    @Column(columnDefinition = "varchar(25) default NULL")
    private String contact;

    @Nullable
    @Column(columnDefinition = "boolean default false")
    private Boolean isDone;

    @Column(columnDefinition = "integer default 0")
    private int views;

    // 게시글 삭제시 첨부이미지도 삭제
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    List<Image> images = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    List<Comment> comments = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "article_id", referencedColumnName = "id")
    List<Likes> likes = new ArrayList<>();

    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDateTime.now();
    }

}
