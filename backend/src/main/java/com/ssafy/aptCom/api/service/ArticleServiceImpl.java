package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.api.dto.response.ArticleDto;
import com.ssafy.aptCom.db.repository.*;
import com.ssafy.aptCom.api.dto.request.ArticleUpdateRequestDto;
import com.ssafy.aptCom.db.entity.*;
import com.ssafy.aptCom.db.repository.ArticleRepository;
import com.ssafy.aptCom.db.repository.CategoryRepository;
import com.ssafy.aptCom.db.repository.CommunityRepository;
import com.ssafy.aptCom.db.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private ArticleRepository articleRepository;
    private CommunityRepository communityRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    private LikesRepository likesRepository;

    static ArrayList<String> nicks1 = new ArrayList<>(Arrays.asList("춤추는", "잠자는", "겨울잠에서 깨어난",
            "책읽는", "뛰어다니는", "뒷구르기하는", "앞구르기하는", "티타임중인", "커피를 좋아하는"
            , "노래하는", "새침한", "버블티를 좋아하는", "산책하는", "씩씩한"));
    static ArrayList<String> nicks2 = new ArrayList<>(Arrays.asList("친칠라", "치타", "하이에나", "악어",
            "펭귄", "부엉이", "올빼미", "다람쥐", "코알라", "캥거루", "두루미", "우파루파",
            "너구리", "카멜레온", "돌고레", "알파카", "기린", "코뿔소"));

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

    @Transactional
    @Override
    public void deleteArticleImagesDB(Integer articleId) {
        imageRepository.deleteAllImgByArticleId(articleId);
    }

    @Transactional
    @Override
    public void deleteArticleImages(List<String> old_images_url) throws IOException {
        for (String oiu : old_images_url) {
            deleteArticleImage(oiu);
        }
    }

    @Override
    public void deleteArticleImage(String oiu) {
        String fileNameDir = oiu.substring(oiu.indexOf("articleImages"));
        log.info("fileNameDir {}", fileNameDir);
        s3Uploader.disload(fileNameDir);
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

        int randIdx1 = (int)((Math.random()) * nicks1.size());
        int randIdx2 = (int)((Math.random()) * nicks2.size());
        String randNick = nicks1.get(randIdx1) + " " + nicks2.get(randIdx2);

        // getCommunityId() 0이면 null로 community 넣기(공지용)
        Community community = null;
        Category category = categoryRepository.findCategoryByCategoryName(articleRequestDto.getCategory());
        if (articleRequestDto.getCommunityId() != 0) {
            community = communityRepository.getOne(articleRequestDto.getCommunityId());
        }

        // is_done 은 null일 경우 0으로 수동으로 default 잡아주어야
        Article article = Article.builder()
                .user(user)
                .community(community)
                .category(category)
                .anonyAuthor(randNick)
                .title(articleRequestDto.getTitle())
                .contents(articleRequestDto.getContents())
                .contact(articleRequestDto.getContact())
                .isDone((articleRequestDto.getIsDone() == null) ? false : articleRequestDto.getIsDone())
                .build();
        Article savedArticle = articleRepository.save(article);
        return savedArticle.getId();
    }

    public Article getArticle(Integer articleId) {

        return  articleRepository.findById(articleId).orElse(null);
    }

    @Transactional
    public List<ArticleDto> getArticles(
            User user, int communityId, int lastArticleId, int size,
            int categoryId, String keyword
    ) {
        List<Article> articleList = null;

        // categoryId가 1인 경우는 공지사항 조회 (나머지 파라미터 모두 0), 1이 아닌 경우는 일반 게시글 조회
        if(categoryId == 1) {
            articleList = articleRepository.findByCategoryId(categoryId);
        } else {
            articleList = articleRepository.findByIdIsLessThanOrderByCreatedAtDesc(
                    communityId, lastArticleId, categoryId, keyword, size);
        }

        List<ArticleDto> articleDtoList = new ArrayList<>();
        Boolean likeYn = false;

        for(Article article : articleList){
            Likes likes = likesRepository.findLikesByArticleAndUser(article, user).orElse(null);
            if(likes != null) likeYn = true;
            else likeYn =  false;

            articleDtoList.add(ArticleDto.of(article, likeYn));
        }
        return articleDtoList;
    }

    @Transactional
    public boolean updateArticleViews(Article article) {

        articleRepository.save(article);
        return true;
    }

    @Transactional
    @Override
    public void deleteArticleImagesS3(Integer articleId) throws IOException {
        // 기존이미지 불러온 후 삭제
        log.info("이미지 s3삭제");
        List<String> old_images_url = imageRepository.findAllImgUrlByArticleId(articleId);
        log.info("oiu:{}", old_images_url);

        if (old_images_url.size() > 0) {
            log.info("기존 이미지 S3 삭제");
            deleteArticleImages(old_images_url);
        }
    }

    // 게시글 UPDATE
    @Override
    @Transactional
    public void updateArticle(Integer articleId, ArticleUpdateRequestDto articleUpdateRequestDto) {
        Article old_article = articleRepository.getOne(articleId);
        Category category = categoryRepository.findCategoryByCategoryName(articleUpdateRequestDto.getCategory());
        old_article.setCategory(category);
        old_article.setTitle(articleUpdateRequestDto.getTitle());
        old_article.setContents(articleUpdateRequestDto.getTitle());
        old_article.setContact(articleUpdateRequestDto.getContact());
        old_article.setIsDone((articleUpdateRequestDto.getIsDone() == null) ? false : articleUpdateRequestDto.getIsDone());
        articleRepository.save(old_article);
        log.info("게시글 업데이트 완료");
    }

    // 게시글 DELETE
    @Transactional
    @Override
    public boolean deleteArticle(Integer articleId) {
        articleRepository.deleteById(articleId);
        return true;
    }
}
