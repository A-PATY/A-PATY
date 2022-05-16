import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { article } from '../../../types/boardTypes';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import BoardService from '../../../services/BoardService';

interface Props {
  article: article;
}

const BoardArticle: React.FC<Props> = ({ article }) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCnt, setlikeCnt] = useState<number>(0);

  useEffect(() => {
    setIsLike(article.likeYN);
    setlikeCnt(article.likes);
  }, [article]);

  const toggleLike = () => {
    BoardService.changeLike(article.articleId.toString())
      .then(() => {
        setIsLike(!isLike);

        if (isLike) {
          setlikeCnt(likeCnt - 1);
        } else {
          setlikeCnt(likeCnt + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <ArticleWrapper key={article.articleId}>
      <Category>
        {article.category}
        {(article.category === '나눔장터' || article.category === '공구') &&
        article.doneyn === true ? (
          <Info className="isDone">완료</Info>
        ) : undefined}
        {(article.category === '나눔장터' || article.category === '공구') &&
        article.doneyn === false ? (
          <Info className="isNotDone">진행 중</Info>
        ) : undefined}
      </Category>
      <Article>
        <Title href={`/board/${article.articleId}`}>{article.title}</Title>
        <Contents href={`/board/${article.articleId}`}>
          {article.contents}
          {article.imgs?.length !== 0 && article.imgs !== null && (
            <Image src={article.imgs[0].imgUrl} />
          )}
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
          <Info className="icon" style={{ cursor: 'pointer'}} onClick={toggleLike}>
            {isLike ? (
              <ThumbUpRoundedIcon sx={{ fontSize: '8px' }} />
            ) : (
              <ThumbUpOutlinedIcon sx={{ fontSize: '8px' }} />
            )}
          </Info>
          <Info style={{ cursor: 'pointer'}} onClick={toggleLike}>{likeCnt}</Info>
          <Info className="icon">
            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: '8px' }} />
          </Info>
          <Info>{article.commentCount}</Info>
        </ArticleInfo>
      </ArticleInfoWrapper>
    </ArticleWrapper>
  );
};

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

const Notice = styled.div`
  display: block;
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
  color: gray;
`;

export default BoardArticle;
