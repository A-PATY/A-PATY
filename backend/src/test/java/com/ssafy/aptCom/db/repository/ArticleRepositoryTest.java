package com.ssafy.aptCom.db.repository;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.Category;
import com.ssafy.aptCom.db.entity.Community;
import com.ssafy.aptCom.db.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
@DataJpaTest
@DisplayName("article repository test")
class ArticleRepositoryTest {

    @Autowired
    private ArticleRepository articleRepository;

    @Mock
    private CommunityRepository communityRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private UserRepository userRepository;

    @DisplayName("article 조회")
    @Test
    void findByIdIsLessThanOrderByCreatedAtDesc() {

        // given
        final User user =
                User.builder()
                        .nickname("nick")
                        .createdAt(LocalDateTime.now())
                        .build();

        userRepository.save(user);

        final Community community =
                Community.builder()
                        .id(1)
                        .communityCode("123123")
                        .communityType("지역")
                        .communityType2("익명")
                        .build();

        communityRepository.save(community);

        final Category category =
                Category.builder()
                        .id(1)
                        .categoryName("잡담")
                        .build();

        categoryRepository.save(category);

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                "Hello, World!".getBytes()
        );

        ArrayList files = new ArrayList();
        files.add(file);

        final ArticleRequestDto articleRequestDto = new ArticleRequestDto();
        articleRequestDto.setTitle("title");
        articleRequestDto.setImg(files);
        articleRequestDto.setContents("contents");
        articleRequestDto.setCommunityId(1);
        articleRequestDto.setCategory("잡담");
        articleRequestDto.setContact("010-1234-5678");

        final Article article =
                Article.builder()
                        .id(1)
                        .category(categoryRepository.getOne(1))
                        .community(communityRepository.getOne(1))
                        .title(articleRequestDto.getTitle())
                        .contents(articleRequestDto.getContents())
                        .user(userRepository.getOne(1))
                        .build();

        articleRepository.save(article);

        // when
        Article result = articleRepository.getOne(1);
//        List<Article> results = articleRepository.findByIdIsLessThanOrderByCreatedAtDesc(1, 2,
//                1, "c", 5
//        );

        // then
        assertThat(result.getContents()).isEqualTo("contents");
//        assertThat(results.size()).isEqualTo(1);

    }

}