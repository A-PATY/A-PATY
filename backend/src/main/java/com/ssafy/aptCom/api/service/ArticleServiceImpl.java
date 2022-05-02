package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Category;
import com.ssafy.aptCom.db.entity.Community;
import com.ssafy.aptCom.db.entity.Image;
import com.ssafy.aptCom.db.repository.ArticleRepository;
import com.ssafy.aptCom.db.repository.CategoryRepository;
import com.ssafy.aptCom.db.repository.CommunityRepository;
import com.ssafy.aptCom.db.repository.ImageRepository;
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
    private ImageRepository imageRepository;
    private ArticleRepository articleRepository;
    private CommunityRepository communityRepository;
    private CategoryRepository categoryRepository;

    public ArticleServiceImpl(S3Uploader s3Uploader, ImageRepository imageRepository,
                              ArticleRepository articleRepository, CommunityRepository communityRepository,
                              CategoryRepository categoryRepository) {
        this.s3Uploader = s3Uploader;
        this.imageRepository = imageRepository;
        this.articleRepository = articleRepository;
        this.communityRepository = communityRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<String> saveArticleImages(List<MultipartFile> multipartFiles, Integer articleId) throws IOException {


        List<String> multipartFileResult = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                multipartFileResult.add(saveArticleImage(multipartFile, articleId));
            }
        }

        return multipartFileResult;

    }

    @Override
    public String saveArticleImage(MultipartFile multipartFile, Integer articleId) throws IOException {

        if (multipartFile.isEmpty()) {
            log.info("no images");
            return null;
        }

        log.info("originalFilename={}", multipartFile.getOriginalFilename());

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename = createStoreFilename(originalFilename);

        String imageUrl = s3Uploader.upload(multipartFile, "articleImages", storeFilename);
        log.info("imageUrl={}", imageUrl);

        Image image = Image.builder()
                .article(articleRepository.getOne(articleId))
                .imgUrl(imageUrl)
                .build();

        imageRepository.save(image);
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

    // 게시글 CREATE
    @Override
    public Integer createArticle(ArticleRequestDto articleRequestDto) {
        log.info(articleRequestDto.getTitle());

        Community community = communityRepository.getOne(articleRequestDto.getCommunityId());
        Category category = categoryRepository.getOne(articleRequestDto.getCategoryId());
        Article article = Article.builder()
                .community(community)
                .category(category)
                .title(articleRequestDto.getTitle())
                .contents(articleRequestDto.getContents())
                .contact(articleRequestDto.getContact())
                .isDone(articleRequestDto.getIsDone())
                .build();
        articleRepository.save(article);
        return article.getId();
    }

//    // 게시글 READ
//    @Override
//    public void getArticle(ArticleRequestDto articleRequestDto) {
//
//    }
//
//    // 게시글 UPDATE
//    @Override
//    public void updateArticle(ArticleRequestDto articleRequestDto) {
//
//    }
//
//    // 게시글 DELETE
//    @Override
//    public void deleteArticle(ArticleRequestDto articleRequestDto) {
//
//    }
}
