package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    void deleteByUserId(int userId);

}
