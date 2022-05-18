import React from 'react';
import styled from '@emotion/styled';
import { article } from '../../../types/boardTypes';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
// import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
// import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
// import Chip from '@mui/material/Chip';
// import BoardService from '../../../services/BoardService';
// import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import BoardArticle from './BoardArticle';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface Props {
  data: any;
  fetchNextPage: () => void;
  hasNextPage: any;
  isFetching: any;
  isFetchingNextPage: any;
}

const Board: React.FC<Props> = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}) => {
  // const [lastArticleId, setLastArticleId] = React.useState<number>(0);
  // const defaultPaginationSize = 5; // 한 번 요청으로 가져올 게시글의 개수
  // const communityId = 367;
  // const categoryId = 1;
  // const keyword = '';

  // const fetchArticles = async ({ pageParam = 0 }) => {
  //   const { articles } = await BoardService.getArticles(
  //     communityId,
  //     pageParam,
  //     defaultPaginationSize,
  //     categoryId,
  //     keyword,
  //   );
  //   return {
  //     result: articles,
  //   };
  // };

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery(`localArticles-category${categoryId}`, fetchArticles, {
  //   getNextPageParam: (lastPage) =>
  //     lastPage.result[lastPage.result.length - 1].articleId, // 마지막 글 id (lastArticleId)를 다음 param으로 보냄
  // });

  console.log('data');
  console.log(data);

  const ObservationComponent = (): React.ReactElement => {
    const [ref, inView] = useInView();

    React.useEffect(() => {
      if (!data) {
        console.log('inView: ' + inView);
        console.log('data가 없음');
        console.log(data);
        return;
      }
      if (data.pages[data.pages.length - 1].result.length === 0) {
        console.log('마지막 page의 result 길이가 0입니다.');
        console.log(data.pages[data.pages.length - 1].result);
        return;
      }
      if (inView) {
        console.log('////////////////fetchNextPage 실행//////////////');
        console.log('inView: ' + inView);
        fetchNextPage(); // 다음 페이지 fetch
      }
    }, [inView]);

    return <div ref={ref} />;
  };

  return (
    <>
      <Container id="Container">
        <Wrapper id="Wrapper">
          <>
            {data?.pages.map(
              (
                group: { result: article[] },
                i: number, // 타입 지정을 안해주면 에러 발생
              ) => (
                <React.Fragment key={i}>
                  {group.result.map((article: article) => {
                    return (
                      <BoardArticle article={article} key={article.articleId} />
                      // <ArticleWrapper key={article.articleId}>
                      //   <Category>
                      //     {article.category}
                      //     {(article.category === '나눔장터' ||
                      //       article.category === '공구') &&
                      //     article.doneyn === true ? (
                      //       <Info className="isDone">완료</Info>
                      //     ) : undefined}
                      //     {(article.category === '나눔장터' ||
                      //       article.category === '공구') &&
                      //     article.doneyn === false ? (
                      //       <Info className="isNotDone">진행 중</Info>
                      //     ) : undefined}
                      //   </Category>
                      //   <Article>
                      //     <Title href={`/board/${article.articleId}`}>
                      //       {article.title}
                      //     </Title>
                      //     <Contents href={`/board/${article.articleId}`}>
                      //       {article.contents}
                      //       {article.imgs?.length !== 0 &&
                      //         article.imgs !== null && (
                      //           <Image src={article.imgs[0].src} />
                      //         )}
                      //     </Contents>
                      //   </Article>
                      //   <ArticleInfoWrapper>
                      //     <ArticleInfo>
                      //       <Info>{article.createdAt}</Info>
                      //       <Info>{article.author}</Info>
                      //     </ArticleInfo>
                      //     <ArticleInfo>
                      //       <Info className="icon">
                      //         <VisibilityRoundedIcon sx={{ fontSize: '8px' }} />
                      //       </Info>
                      //       <Info>{article.views}</Info>
                      //       <Info className="icon">
                      //         {article.likeYN ? (
                      //           <ThumbUpRoundedIcon sx={{ fontSize: '8px' }} />
                      //         ) : (
                      //           <ThumbUpOutlinedIcon sx={{ fontSize: '8px' }} />
                      //         )}
                      //       </Info>
                      //       <Info>{article.likes}</Info>
                      //       <Info className="icon">
                      //         <ChatBubbleOutlineRoundedIcon
                      //           sx={{ fontSize: '8px' }}
                      //         />
                      //       </Info>
                      //       <Info>{article.commentCount}</Info>
                      //     </ArticleInfo>
                      //   </ArticleInfoWrapper>
                      // </ArticleWrapper>
                    );
                  })}
                </React.Fragment>
              ),
            )}
            {/* <div>
              <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
              </button>
            </div> */}
            <ObservationComponent />
            <Notice>
              {isFetching && !isFetchingNextPage ? (
                <>
                  <Stack spacing={1}>
                    <Skeleton />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="rectangular" width={350} height={300} />
                  </Stack>
                </>
              ) : null}
            </Notice>
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

export default Board;
