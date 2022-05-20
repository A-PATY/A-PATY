package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Likes;
import com.ssafy.aptCom.db.entity.User;

public interface LikesService {

    boolean saveLikes(Article article, User user);

    boolean deleteLikes(int likesId);

    Likes getLikesByArticleAndUser(Article article, User user);

}
