package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Category;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@ApiModel("CategoryDto")
@Getter
@Setter
public class CategoryDto {

    private int id;

    private String categoryName;

    private boolean adminOnly;

    public CategoryDto of (Category category) {
        CategoryDto res = new CategoryDto();

        res.setId(category.getId());
        res.setCategoryName(category.getCategoryName());
        res.setAdminOnly(category.isAdminOnly());

        return res;
    }

}
