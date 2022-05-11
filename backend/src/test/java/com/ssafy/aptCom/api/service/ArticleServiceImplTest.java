package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.ArticleRequestDto;
import com.ssafy.aptCom.db.entity.Article;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.ArticleRepository;
import com.ssafy.aptCom.db.repository.CategoryRepository;
import com.ssafy.aptCom.db.repository.CommunityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
@DisplayName("ArticleService 테스트")
class ArticleServiceImplTest {

    @InjectMocks
    private ArticleServiceImpl articleService;

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private CommunityRepository communityRepository;

    @Mock
    private CategoryRepository categoryRepository;

    private MockMvc mockMvc;

    @BeforeEach
    void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(articleService).build();
    }

    @Test
    @DisplayName("create 테스트")
    void createArticle() {

        // given
        final User user =
                User.builder()
                        .nickname("nick")
                        .createdAt(LocalDateTime.now())
                        .build();

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
                        .title(articleRequestDto.getTitle())
                        .contents(articleRequestDto.getContents())
                        .community(communityRepository.getOne(articleRequestDto.getCommunityId()))
                        .category(categoryRepository.findCategoryByCategoryName(articleRequestDto.getCategory()))
                        .user(user)
                        .build();

        doReturn(article).when(articleRepository).save(any(Article.class));

        // when
        final int id = articleService.createArticle(articleRequestDto, user);

        // then
        assertEquals(1, id);
        verify(articleRepository, times(1)).save(any(Article.class));

    }

    @Test
    @DisplayName("delete 테스트")
    void deleteArticle() {

        //given
        final User user =
                User.builder()
                        .nickname("nick")
                        .createdAt(LocalDateTime.now())
                        .build();

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
                        .title(articleRequestDto.getTitle())
                        .contents(articleRequestDto.getContents())
                        .community(communityRepository.getOne(articleRequestDto.getCommunityId()))
                        .category(categoryRepository.findCategoryByCategoryName(articleRequestDto.getCategory()))
                        .user(user)
                        .build();

        doReturn(article).when(articleRepository).save(any(Article.class));

        // when
        final int id = articleService.createArticle(articleRequestDto, user);
        final boolean result = articleService.deleteArticle(id);

        // then
        assertEquals(1, id);
        assertTrue(result);

    }
}