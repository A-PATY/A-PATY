import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userInfoState } from '../features/Login/atom';
import { presentCommunityTypeState } from '../features/Board/atom';
import Footer from '../components/common/Footer';
import BoardList from '../components/Community/BoardList';
import BoardHeader from '../components/Community/BoardHeader';
import BoardService from '../services/BoardService';
import { useInfiniteQuery } from 'react-query';
import useCommunityId from '../hooks/useCommunityId';
import AptTabHeader from '../components/Community/Apt/AptTabHeader';
import { getCookie } from '../hooks/Cookie';
import Swal from 'sweetalert2';

const AptCommunityPage: React.FC = () => {
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

  const [communityType, setCommunityType] = useRecoilState(
    presentCommunityTypeState,
  );

  const userInfo = useRecoilValue(userInfoState);

  // 현재 communityId
  const aptCommunityId = useCommunityId(2);
  const aptAnonyCommunityId = useCommunityId(3);
  const [communityId, setCommunityId] = useState<number | undefined>(
    aptCommunityId,
  );
  console.log('communityId');
  console.log(communityId);

  // 게시판 목록 조회
  const defaultPaginationSize = 1; // 한 번 요청으로 가져올 게시글의 개수
  const [categoryId, setCategoryId] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');

  const fetchArticles = async ({ pageParam = 0 }) => {
    const { articles } = await BoardService.getArticles(
      communityId,
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
    [`localArticles-category${categoryId}`, communityId, keyword],
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

  // 아파트/ 아파트익명 탭
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (communityType === 2) {
      setCommunityType(3);
      setCommunityId(aptAnonyCommunityId);
    } else if (communityType === 3) {
      setCommunityType(2);
      setCommunityId(aptCommunityId);
    }
  };

  useEffect(() => {
    document.title = '아파트 커뮤니티';
    setCommunityType(2);
  }, []);

  return (
    <>
      <Container id="Container">
        <AptTabHeader value={value} handleChange={handleChange} />
        <BoardHeader
          type={2}
          communityId={communityId}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <BoardList
          type={2}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          data={data}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Container>
      <Footer footerNumber={2} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 75px);
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  // &::-webkit-scrollbar-track {
  //   background-color: transparent;
  // }
`;

export default AptCommunityPage;
