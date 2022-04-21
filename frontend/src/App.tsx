import { Global } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';

const App: React.FC = () => {
  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
