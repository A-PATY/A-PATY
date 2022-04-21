import { useEffect } from 'react';
import MainHeader from '../components/Main/Header';
import Main from '../components/Main/Main';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <MainHeader />
      <Main />
    </>
  );
};

export default MainPage;
