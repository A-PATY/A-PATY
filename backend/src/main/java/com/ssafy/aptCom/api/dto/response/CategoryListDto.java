package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryListDto {

    List<CategoryList> categoryList;

    public static CategoryListDto of(List<Category> categoryList) {

        CategoryListDto res = new CategoryListDto();
        res.setCategoryList(CategoryList.of(categoryList));

        return res;
    }

}
