import { Global } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import AptRegisterPage from './pages/AptRegisterPage';
import AptCertifyPage from './pages/AptCertifyPage';
import MyPage from './pages/MyPage';
import LocalCommunityPage from './pages/LocalCommunityPage';
import ArticlePage from './pages/ArticlePage';
import FindFamilyPage from './pages/FindFamilyPage';
import SignUpPage from './pages/SignUpPage';
import ArticleWritePage from './pages/ArticleWritePage';

const App: React.FC = () => {
  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/apt_register" element={<AptRegisterPage />} />
          <Route path="/apt_certify" element={<AptCertifyPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/local_community" element={<LocalCommunityPage />} />
          <Route path="/board/:article_id" element={<ArticlePage />} />
          <Route path="/find_family" element={<FindFamilyPage />} />
          <Route path="/oauth/callback/kakao" element={<SignUpPage />} />
          <Route path="/board/write" element={<ArticleWritePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;