import { useEffect } from 'react';
import Header from '../components/AptRegister/AptCertifyHeader';
import AptCertify from '../components/AptRegister/AptCertify';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Header/>
      <AptCertify></AptCertify>
    </>
  );
};

export default MainPage;
