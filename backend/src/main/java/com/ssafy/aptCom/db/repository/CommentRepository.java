package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    void deleteByUserId(int userId);

    @Transactional
    @Modifying
    @Query("delete from Comment c where c.user = :id")
    void deleteAllByUserId(@Param("id") int id);
}
