import { useEffect } from 'react';
import Header from '../components/AptRegister/Header';
import AptRegister from '../components/AptRegister/AptRegister';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Header/>
      <AptRegister></AptRegister>
    </>
  );
};

export default MainPage;
