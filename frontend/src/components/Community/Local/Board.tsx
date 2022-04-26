import styled from '@emotion/styled';
import { articles } from '../../../types/boardTypes';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Chip from '@mui/material/Chip';

const Board: React.FC = () => {
  const articleList: articles = {
    articles: [
      {
        articleId: 2,
        category: '일상',
        title: '점심 다들 뭐 먹었나요',
        contents: '오늘 점심 돈까스였습니다. 너무 더워요',
        img: null,
        contact: null,
        isDone: false,
        views: 13,
        likes: 15,
        isLike: true,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 흑장미',
      },
      {
        articleId: 3,
        category: '나눔장터',
        title: '달려오세요',
        contents: '인형 나눔해요',
        img: `\img\did.png`,
        contact: '010-1111-2222',
        isDone: false,
        views: 13,
        likes: 15,
        isLike: false,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 백장미',
      },
      {
        articleId: 4,
        category: '나눔장터',
        title: '달려오세요',
        contents: '인형 나눔해요',
        img: `\img\did.png`,
        contact: '010-1111-2222',
        isDone: false,
        views: 13,
        likes: 15,
        isLike: false,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 백장미',
      },
      {
        articleId: 5,
        category: '공구',
        title: '가지고 싶어요 ㅠㅠㅠ',
        contents: '인형 공구해요',
        img: `\img\did.png`,
        contact: '010-1111-2222',
        isDone: false,
        views: 13,
        likes: 15,
        isLike: false,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 백장미',
      },
      {
        articleId: 6,
        category: '나눔장터',
        title: '가지고 싶어요 ㅠㅠㅠ',
        contents: '인형 나눔해요',
        img: `\img\did.png`,
        contact: '010-1111-2222',
        isDone: false,
        views: 13,
        likes: 15,
        isLike: false,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 백장미',
      },
      {
        articleId: 7,
        category: '나눔장터',
        title: '가지고 싶어요 ㅠㅠㅠ',
        contents: '인형 나눔해요',
        img: `\img\did.png`,
        contact: '010-1111-2222',
        isDone: false,
        views: 13,
        likes: 15,
        isLike: false,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 백장미',
      },
      {
        articleId: 8,
        category: '공구',
        title: '먹고 싶어요 ㅠㅠㅠ',
        contents: '돈까스 공구해요',
        img: null,
        contact: '010-1111-2222',
        isDone: true,
        views: 13,
        likes: 15,
        isLike: false,
        createdAt: '2022-04-15 15:03',
        commentCount: 3,
        author: '101동 102호 백장미',
      },
    ],
  };
  return (
    <>
      <Container>
        <Wrapper>
          <>
            {articleList.articles.map((article) => {
              return (
                <ArticleWrapper>
                  <Category>
                    {article.category}
                    {(article.category === '나눔장터' ||
                      article.category === '공구') &&
                    article.isDone === true ? (
                      <Info className="isDone">완료</Info>
                    ) : undefined}
                    {(article.category === '나눔장터' ||
                      article.category === '공구') &&
                    article.isDone === false ? (
                      <Info className="isNotDone">진행 중</Info>
                    ) : undefined}
                  </Category>
                  <Article>
                    <Title href={`/board/${article.articleId}`}>
                      {article.title}
                    </Title>
                    <Contents href={`/board/${article.articleId}`}>
                      {article.contents}
                      {article.img !== null && <Image src="\img\did.png" />}
                    </Contents>
                  </Article>
                  <ArticleInfoWrapper>
                    <ArticleInfo>
                      <Info>{article.createdAt}</Info>
                      <Info>{article.author}</Info>
                    </ArticleInfo>
                    <ArticleInfo>
                      <Info className="icon">
                        <VisibilityRoundedIcon sx={{ fontSize: '8px' }} />
                      </Info>
                      <Info>{article.views}</Info>
                      <Info className="icon">
                        {article.isLike ? (
                          <ThumbUpRoundedIcon sx={{ fontSize: '8px' }} />
                        ) : (
                          <ThumbUpOutlinedIcon sx={{ fontSize: '8px' }} />
                        )}
                      </Info>
                      <Info>{article.likes}</Info>
                      <Info className="icon">
                        <ChatBubbleOutlineRoundedIcon
                          sx={{ fontSize: '8px' }}
                        />
                      </Info>
                      <Info>{article.commentCount}</Info>
                    </ArticleInfo>
                  </ArticleInfoWrapper>
                </ArticleWrapper>
              );
            })}
          </>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-top: 8px solid #f2f2f3;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 20px;
  border-bottom: 8px solid #f2f2f3;
`;

const ArticleWrapper = styled.div`
  padding: 11px 0;
  position: relative;
  border-bottom: 1px solid #f5f5f5;
`;

const Category = styled.span`
  display: block;
  font-size: 12px;
`;

const Article = styled.div``;

const Title = styled.a`
  display: block;
  max-width: 100%;
  margin-top: 5px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
`;

const Contents = styled.a`
  display: block;
  max-width: 100%;
  margin-top: 5px;
  line-height: 20px;
  font-size: 14px;
`;

const Image = styled.img`
  margin-top: 5px;
  width: 100%;
`;

const ArticleInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArticleInfo = styled.div`
  display: block;
  margin-left: 0;
  position: relative;
  top: auto;
  transform: translateY(0);
  margin-top: 10px;
  right: 0;
  font-size: 8px;
`;

const Info = styled.span`
  margin-right: 5px;

  &.icon {
    margin-right: 3px;
  }

  &.isDone {
    background-color: #d3d3d3;
    margin-left: 5px;
    border-radius: 3px;
  }

  &.isNotDone {
    background-color: #ffb2a9;
    margin-left: 5px;
    border-radius: 3px;
  }
`;

export default Board;
