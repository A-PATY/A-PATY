package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class ArticleServiceImpl implements ArticleService {

    final S3Uploader s3Uploader;

    public ArticleServiceImpl(S3Uploader s3Uploader) {
        this.s3Uploader = s3Uploader;
    }

    @Override
    public List<String> saveArticleImages(List<MultipartFile> multipartFiles) throws IOException {


        List<String> multipartFileResult = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                multipartFileResult.add(saveArticleImage(multipartFile));
            }
        }

        return multipartFileResult;

    }

    @Override
    public String saveArticleImage(MultipartFile multipartFile) throws IOException {

        if (multipartFile.isEmpty()) {
            return null;
        }

        log.info("originalFilename={}", multipartFile.getOriginalFilename());

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = createStoreFilename(originalFilename);

        String imageUrl = s3Uploader.upload(multipartFile, "articleImages", storeFilename);
        log.info("imageUrl={}", imageUrl);

        return imageUrl;
    }

    // 랜덤 파일명 생성
    @Override
    public String createStoreFilename(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalFilename);
        return uuid + "." + ext;
    }

    // 파일형식(ex.jpg)
    @Override
    public String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    @Override
    public void createArticle(ArticleRequestDto articleRequestDto) {
        log.info(articleRequestDto.getTitle());
    }
}
