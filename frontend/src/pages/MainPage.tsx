import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import MainHeader from '../components/Main/Header';
import Main from '../components/Main/Main';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Main />
    </>
  );
};

export default MainPage;
