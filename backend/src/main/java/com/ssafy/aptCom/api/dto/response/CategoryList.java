package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CategoryList {

    private int categoryId;

    private String categoryName;

    private boolean adminOnly;

    public static List<CategoryList> of(List<Category> categories) {
        List<CategoryList> res = new ArrayList<>();

        for (Category category : categories) {
            CategoryList categoryList = new CategoryList();
            categoryList.setCategoryId(category.getId());
            categoryList.setCategoryName(category.getCategoryName());
            categoryList.setAdminOnly(category.isAdminOnly());
            res.add(categoryList);
        }

        return res;

    }
}
