package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.CommentDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.User;

public interface CommentService {

    boolean saveComment(Article article, CommentDto commentDto, User user);

    boolean deleteComment(int commentId);

}
