package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.dto.request.ArticleUpdateRequestDto;
import com.ssafy.aptCom.db.entity.*;
import com.ssafy.aptCom.db.repository.ArticleRepository;
import com.ssafy.aptCom.db.repository.CategoryRepository;
import com.ssafy.aptCom.db.repository.CommunityRepository;
import com.ssafy.aptCom.db.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

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
        if (!multipartFiles.isEmpty()){
            for (MultipartFile multipartFile : multipartFiles) {
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

    @Override
    public void deleteArticleImages(List<String> old_images_url) throws IOException {
        for (String oiu : old_images_url) {
            deleteArticleImage(oiu);
        }
    }

    @Override
    public void deleteArticleImage(String oiu) throws IOException {
        log.info("oiu={}", oiu);

        String fileNameDir = "articleImages" + "/" + oiu;
//        s3Uploader.disload(fileNameDir);
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
    @Transactional
    @Override
    public Integer createArticle(ArticleRequestDto articleRequestDto, User user) {
        log.info(articleRequestDto.getTitle());

        ArrayList<String> nicks1 = new ArrayList<>(Arrays.asList("춤추는", "잠자는", "겨울잠에서 깨어난",
                "책읽는", "뛰어다니는", "뒷구르기하는", "앞구르기하는", "티타임을 가지는", "커피를 좋아하는"
        , "노래하는", "새침한", "버블티를 좋아하는", "산책하는", "씩씩한"));

        ArrayList<String> nicks2 = new ArrayList<>(Arrays.asList("친칠라", "치타", "하이에나", "악어",
                "펭귄", "부엉이", "올빼미", "다람쥐", "코알라", "캥거루", "두루미", "우파루파",
                "너구리", "카멜레온", "돌고레", "알파카", "기린", "코뿔소"));

        int randIdx1 = (int)((Math.random()) * nicks1.size());
        int randIdx2 = (int)((Math.random()) * nicks2.size());
        String randNick = nicks1.get(randIdx1) + nicks2.get(randIdx2);

        Community community = communityRepository.getOne(articleRequestDto.getCommunityId());
        Category category = categoryRepository.findCategoryByCategoryName(articleRequestDto.getCategory());
        Article article = Article.builder()
                .user(user)
                .community(community)
                .category(category)
                .anonyAuthor(randNick)
                .title(articleRequestDto.getTitle())
                .contents(articleRequestDto.getContents())
                .contact(articleRequestDto.getContact())
                .isDone(articleRequestDto.getIsDone())
                .build();
        articleRepository.save(article);
        return article.getId();
    }

    // 게시글 이미지 업데이트
    @Override
    public void updateArticleImages(List<MultipartFile> multipartFiles, Integer articleId) throws IOException {
        //1. 기존이미지 불러온다.
        //2. 기존이미지 미존재 및 새 이미지 미존재 -> pass
        //3. 기존이미지 미존재 및 새 이미지 존재 -> saveArticleImages
        //4. 기존이미지 존재 및 새 이미지 미존재 -> deleteArticleImages
        //5. 기존이미지 존재 및 새 이미지 존재 -> 기존이미지 삭제 및 새 이미지 업로드
        Article article = articleRepository.getOne(articleId);
        List<String> old_images_url = imageRepository.findAllImgUrlByArticleId(article);
        if (!old_images_url.isEmpty()) {
            imageRepository.deleteAllByArticleId(articleId);
            deleteArticleImages(old_images_url);
            if (!multipartFiles.isEmpty()) {
                saveArticleImages(multipartFiles, articleId);
            }
        }
        if (old_images_url.isEmpty() && !multipartFiles.isEmpty()) {
            saveArticleImages(multipartFiles, articleId);
        }
    }

    // 게시글 UPDATE
    @Transactional
    @Override
    public void updateArticle(Integer articleId, ArticleUpdateRequestDto articleUpdateRequestDto) {
        Article old_article = articleRepository.getOne(articleId);
        Category category = categoryRepository.findCategoryByCategoryName(articleUpdateRequestDto.getCategory());
        old_article.setCategory(category);
        old_article.setTitle(articleUpdateRequestDto.getTitle());
        old_article.setContents(articleUpdateRequestDto.getTitle());
        old_article.setContact(articleUpdateRequestDto.getContact());
        old_article.setDone(articleUpdateRequestDto.getIsDone());
        articleRepository.save(old_article);
    }

    // 게시글 DELETE
    @Transactional
    @Override
    public void deleteArticle(Integer articleId) {
        articleRepository.deleteById(articleId);
    }
}
