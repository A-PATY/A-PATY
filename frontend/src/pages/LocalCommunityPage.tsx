import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../features/Login/atom';
import { presentCommunityTypeState } from '../features/Board/atom';
import Footer from '../components/common/Footer';
import BoardList from '../components/Community/BoardList';
import BoardHeader from '../components/Community/BoardHeader';
import BoardService from '../services/BoardService';
import { useInfiniteQuery } from 'react-query';
import useCommunityId from '../hooks/useCommunityId';
import Header from '../components/common/Header';
import { getCookie } from '../hooks/Cookie';
import Swal from 'sweetalert2';

const LocalCommunityPage: React.FC = () => {
  const refreshToken = getCookie('apaty_refresh');

  useEffect(() => {
    if (refreshToken === undefined) {
      Swal.fire({
        title: '로그인 후 서비스 이용해주세요.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.replace('/');
    }
  }, []);

  const setCommunityType = useSetRecoilState(presentCommunityTypeState);
  const userInfo = useRecoilValue(userInfoState);
  const communityName = userInfo?.dongName + ' 커뮤니티';

  // 공통 함수
  const LocalCommunityId = useCommunityId(1);
  // const LocalCommunityId = userInfo?.communityList[0].communityId;
  console.log('LocalCommunityId');
  console.log(LocalCommunityId);

  // const [lastArticleId, setLastArticleId] = React.useState<number>(0);
  const defaultPaginationSize = 10; // 한 번 요청으로 가져올 게시글의 개수
  const [categoryId, setCategoryId] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');

  const fetchArticles = async ({ pageParam = 0 }) => {
    // 여기서 조건문 분기하면 될듯
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
  } = useInfiniteQuery(
    [`localArticles-category${categoryId}`, LocalCommunityId, keyword],
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
    document.title = '지역 커뮤니티';
    setCommunityType(1);
  }, []);

  return (
    <>
      <Container>
        <Header header={communityName} />
        <BoardHeader
          type={1}
          communityId={LocalCommunityId}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <BoardList
          type={1}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
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
