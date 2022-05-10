import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Footer from '../components/common/Footer';
import BoardList from '../components/Community/Local/BoardList';
import BoardHeader from '../components/Community/Local/BoardHeader';
import { userInfoState } from '../features/Login/atom';
import BoardService from '../services/BoardService';
import { useInfiniteQuery } from 'react-query';

const LocalCommunityPage: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState);
  console.log('userInfo');
  console.log(userInfo);

  // communityList를 userInfo에서 가져오는걸로 수정해야함
  const communityList = [
    {
      communityId: 455,
      communityType: '지역',
      communityType2: '전체',
    },
    {
      communityId: 478,
      communityType: '아파트',
      communityType2: '전체',
    },
    {
      communityId: 479,
      communityType: '아파트',
      communityType2: '익명',
    },
  ];

  const LocalCommunityId = communityList.filter(
    (com) => com.communityType === '지역' && com.communityType2 === '전체',
  )[0].communityId;
  console.log(LocalCommunityId);

  useEffect(() => {
    document.title = '지역 커뮤니티';
  }, []);

  // const [lastArticleId, setLastArticleId] = React.useState<number>(0);
  const defaultPaginationSize = 5; // 한 번 요청으로 가져올 게시글의 개수
  const categoryId = 1;
  const keyword = '';

  const fetchArticles = async ({ pageParam = 0 }) => {
    const { articles } = await BoardService.getArticles(
      LocalCommunityId,
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
  } = useInfiniteQuery(`localArticles-category${categoryId}`, fetchArticles, {
    getNextPageParam: (lastPage) =>
      lastPage.result[lastPage.result.length - 1].articleId, // 마지막 글 id (lastArticleId)를 다음 param으로 보냄
  });

  return (
    <>
      <Container>
        <BoardHeader communityId={LocalCommunityId} />
        <BoardList
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Container>
      <Footer footerNumber={1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default LocalCommunityPage;
