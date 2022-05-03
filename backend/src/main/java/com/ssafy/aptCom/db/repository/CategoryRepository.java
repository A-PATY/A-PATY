package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    <Optional> Category findCategoryByCategoryName(String categoryName);
}
