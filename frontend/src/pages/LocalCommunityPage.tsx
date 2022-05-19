import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updatedUser, userInfoState } from '../features/Login/atom';
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
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { UserInfo } from '../types/loginTypes';
import { getDoc, updateDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import Badge from '@mui/material/Badge/Badge';

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
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState)!;
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
  const navigate = useNavigate();
  useEffect(() => {
    document.title = '지역 커뮤니티';
    setCommunityType(1);
  }, []);

  const goToNotification = () => {
    navigate('/notification');
  };

  // 알림기능 추가 ---------------------
  const [notifications, setNotifications] = useState<any>({});

  const userId = useRecoilValue(updatedUser);

  useEffect(() => {
    if (userId) {
      const notifyRef = doc(
        firestore,
        `notifications`,
        userInfo?.userId.toString(),
      );
      onSnapshot(notifyRef, (document) => {
        // console.log('firestore 알림 존재?',document.exists())
        if (document.exists()) {
          const alarm = document.data();
          // console.log("알림은? ", alarm)
          // console.log('firestore의 알림!!', alarm);
          setNotifications(alarm);
          // console.log(notifications);
        }
      });
    }
  }, [userId]);

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
        <ServiceButtonWrapper>
          <TransparentBtn>
            {/* { notifications !== {} || notifications.length > 0 ? */}
            {Object.keys(notifications).length > 0 ? (
              <NotificationsActiveRoundedIcon onClick={goToNotification} />
            ) : (
              <NotificationsActiveRoundedIcon onClick={goToNotification} />
            )}
            {/* <NotificationsActiveRoundedIcon onClick={goToNotification} /> */}
          </TransparentBtn>
        </ServiceButtonWrapper>
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

const ServiceButtonWrapper = styled.div`
  position: sticky;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: scale(100%);
  transition: 2s;
  align-items: center;
  display: flex;
  margin: 20px;
`;

const TransparentBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media (max-width: 330px) {
    & .MuiSvgIcon-root {
      font-size: 20px;
    }
  }
`;

export default LocalCommunityPage;
