import { useEffect } from 'react';
import AptCertify from '../components/AptRegister/AptCertify';
import Header from '../components/common/Header';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Header header="고지서 인증" />
      <AptCertify></AptCertify>
    </>
  );
};

export default MainPage;
