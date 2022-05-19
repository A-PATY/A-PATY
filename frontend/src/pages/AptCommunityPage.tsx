import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
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
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { getDoc, updateDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase';
import { UserInfo } from '../types/loginTypes';
import { updatedUser, userInfoState } from '../features/Login/atom';
import { Badge } from '@mui/material';

const AptCommunityPage: React.FC = () => {
  const refreshToken = getCookie('apaty_refresh');
  const navigate = useNavigate();

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

  // const userInfo = useRecoilValue(userInfoState);
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState)!;
  const [notifications, setNotifications] = useState<any>({});
  const userId = useRecoilValue(updatedUser);

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

  const goToNotification = () => {
    navigate('/notification');
  };

  useEffect(() => {
    if (userId) {
      const notifyRef = doc(
        firestore,
        `notifications`,
        userInfo?.userId.toString(),
      );
      onSnapshot(notifyRef, (document) => {
        if (document.exists()) {
          const alarm = document.data();
          setNotifications(alarm);
        }
      });
    }
  }, [userId]);

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
        <ServiceButtonWrapper>
          <TransparentBtn>
            {Object.keys(notifications).length > 0 ? (
              <BadgeCustom badgeContent="">
                <NotificationsActiveRoundedIcon
                  sx={{ color: '#b65ee6' }}
                  onClick={goToNotification}
                />
              </BadgeCustom>
            ) : (
              <NotificationsActiveRoundedIcon onClick={goToNotification} />
            )}
          </TransparentBtn>
        </ServiceButtonWrapper>
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

const ServiceButtonWrapper = styled.div`
  width: 50px;
  margin: 2px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #e4d2ee;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  right: calc((100% - 350px) / 2);
`;

const TransparentBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: #b65ee6;

  @media (max-width: 330px) {
    & .MuiSvgIcon-root {
      font-size: 20px;
      color: #b65ee6;
    }
  }
`;

const BadgeCustom = styled(Badge)`
  & span {
    font-size: 10px;
    min-width: 12px;
    height: 12px;
    padding: 0;
    background-color: #ff8d81;
  }
`;

export default AptCommunityPage;
