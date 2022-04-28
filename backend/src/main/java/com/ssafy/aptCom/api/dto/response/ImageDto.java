package com.ssafy.aptCom.api.dto.response;

import com.ssafy.aptCom.db.entity.Image;
import io.swagger.annotations.ApiModel;

import java.util.ArrayList;
import java.util.List;


@ApiModel("ImageDto")
public class ImageDto {

    private int id;

    private String imgUrl;

    public void setId(int id) {
        this.id = id;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public List<ImageDto> of (List<Image> images) {
        List<ImageDto> res = new ArrayList<>();

        for (Image image : images) {
            ImageDto imageDto = new ImageDto();

            imageDto.setId(image.getId());
            imageDto.setImgUrl(image.getImgUrl());

            res.add(imageDto);
        }

        return res;
    }
}
