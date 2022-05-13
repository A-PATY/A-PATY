import { Global } from '@emotion/react';
import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import AptRegisterPage from './pages/AptRegisterPage';
import MyPage from './pages/MyPage';
import LocalCommunityPage from './pages/LocalCommunityPage';
import AptCommunityPage from './pages/AptCommunityPage';
import AptAnonyCommunityPage from './pages/AptAnonyCommunityPage';
import ArticlePage from './pages/ArticlePage';
import FindFamilyPage from './pages/FindFamilyPage';
import ArticleWritePage from './pages/ArticleWritePage';
import ArticleEditPage from './pages/ArticleEditPage';
import KakaoCallbackPage from './pages/KakaoCallbackPage';
import NewMemberPage from './pages/NewMemberPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminPage from './pages/AdminPage';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from './features/Login/atom';
import { getCookie, setCookie } from './hooks/Cookie';
import { axiosInstance } from './utils/axios';

import UserService from './services/UserService';
import BoardService from './services/BoardService';
import { categoryListState } from './features/Board/atom';

const App: React.FC = () => {
  const setCategoryList = useSetRecoilState(categoryListState);
  const userInfo = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const accessToken = axiosInstance.defaults.headers.common['Authorization'];
  const refreshToken = getCookie('apaty_refresh');

  useEffect(() => {
    if (userInfo === null && getCookie('apaty_refresh') !== undefined) {
      axiosInstance.defaults.headers.common[
        'RefreshToken'
      ] = `Bearer ${refreshToken}`;
      UserService.getNewToken().then(({ accessToken, refreshToken }) => {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
        setCookie('apaty_refresh', refreshToken, {
          maxAge: 60 * 5,
          path: '/',
        });
        BoardService.getCategoryList().then(({ categoryList }) => {
          // console.log('categoryList : ');
          // console.log(categoryList);
          setCategoryList(categoryList);
        });
        UserService.getUserInfo().then(({ userInfo }) => {
          setUserInfo(userInfo);
        });
      });
    }

    if (userInfo === null && accessToken !== undefined) {
      //악성 유저 처리
    }

    if (userInfo === null && getCookie('apaty_refresh') !== undefined) {
      //로그인 후 이용하도록 처리
    }
  }, [userInfo]);

  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/apt_register" element={<AptRegisterPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/local_community" element={<LocalCommunityPage />} />
          <Route path="/apt_community" element={<AptCommunityPage />} />
          <Route
            path="/apt_community/anonymous"
            element={<AptAnonyCommunityPage />}
          />
          <Route path="/board/:article_id" element={<ArticlePage />} />
          <Route path="/oauth/callback/kakao" element={<KakaoCallbackPage />} />
          <Route path="/find_family" element={<FindFamilyPage />} />
          <Route path="/board/write" element={<ArticleWritePage />} />
          <Route path="/board/:article_id/edit" element={<ArticleEditPage />} />
          <Route path="/newMember" element={<NewMemberPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
