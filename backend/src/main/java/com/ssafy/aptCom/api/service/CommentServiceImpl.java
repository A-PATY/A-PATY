package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.CommentDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Comment;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service("CommentService")
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public boolean saveComment(Article article, CommentDto commentDto, User user) {

        Comment comment = Comment.builder()
                .article(article)
                .commentContent(commentDto.getContents())
                .secret(commentDto.isSecret())
                .user(user)
                .build();

        commentRepository.save(comment);

        return true;
    }

    @Transactional
    public boolean deleteComment(int commentId) {

        commentRepository.deleteById(commentId);
        return true;

    }
}
