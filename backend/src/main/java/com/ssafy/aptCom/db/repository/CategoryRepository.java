package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Transactional
    @Query(value = "SELECT * FROM category AS c WHERE c.category_name = :categoryName", nativeQuery = true)
    <Optional> Category findCategoryByCategoryName(@Param("categoryName") String categoryName);
}
