package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Likes;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.LikesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("LikesService")
public class LikesServiceImpl implements LikesService {

    @Autowired
    private LikesRepository likesRepository;

    public boolean saveLikes(Article article, User user) {

        Likes likes = Likes.builder()
                .article(article)
                .user(user)
                .build();
        likesRepository.save(likes);

        return true;
    }

    public boolean deleteLikes(int likesId) {

        likesRepository.deleteById(likesId);

        return true;
    }

    public Likes getLikesByArticleAndUser(Article article, User user) {

        return likesRepository.findLikesByArticleAndUser(article, user).orElse(null);
    }
}
