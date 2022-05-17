import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { presentCommunityTypeState } from '../../../features/Board/atom';
import Footer from '../../common/Footer';
import BoardList from '../Local/BoardList';
import BoardHeader from '../Local/BoardHeader';
import { userInfoState } from '../../../features/Login/atom';
import BoardService from '../../../services/BoardService';
import { useInfiniteQuery } from 'react-query';
import useCommunityId from '../../../hooks/useCommunityId';

const AptAnonyCommunityPage: React.FC = () => {
  const setCommunityType = useSetRecoilState(presentCommunityTypeState);
  const type = useRecoilValue(presentCommunityTypeState);

  // const userInfo = useRecoilValue(userInfoState);
  // console.log('userInfo : ');
  // console.log(userInfo);

  // 공통 함수
  const AptAnonyCommunityId = useCommunityId(3);
  console.log(AptAnonyCommunityId);

  // const [lastArticleId, setLastArticleId] = React.useState<number>(0);
  const defaultPaginationSize = 10; // 한 번 요청으로 가져올 게시글의 개수
  const [categoryId, setCategoryId] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');

  const fetchArticles = async ({ pageParam = 0 }) => {
    const { articles } = await BoardService.getArticles(
      AptAnonyCommunityId,
      pageParam,
      defaultPaginationSize,
      categoryId,
      keyword,
    );
    return {
      result: articles,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    [`localArticles-category${categoryId}`, AptAnonyCommunityId, keyword],
    fetchArticles,
    {
      getNextPageParam: (lastPage) => {
        // console.log('lastPage : ');
        // console.log(lastPage);
        return lastPage.result.length !== 0
          ? lastPage.result[lastPage.result.length - 1].articleId
          : false;
      },
      // getNextPageParam: (lastPage) =>
      //   lastPage.result[lastPage.result.length - 1].articleId, // 마지막 글 id (lastArticleId)를 다음 param으로 보냄
    },
  );

  useEffect(() => {
    document.title = '아파트 익명 커뮤니티';
    console.log('아파트 익명 커뮤니티');
    setCommunityType(3);
  }, []);

  return (
    <>
      <Container>
        <BoardHeader
          type={3}
          communityId={AptAnonyCommunityId}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <BoardList
          type={3}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default AptAnonyCommunityPage;
