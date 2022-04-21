import { Global } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';

import AptRegisterPage from './pages/AptRegisterPage';
import AptCertifyPage from './pages/AptCertifyPage';


const App: React.FC = () => {
  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/" element={<MainPage></MainPage>} />
          <Route path="/apt_register" element={<AptRegisterPage/>} />
          <Route path="/apt_certify" element={<AptCertifyPage/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
