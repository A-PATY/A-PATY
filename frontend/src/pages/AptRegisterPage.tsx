import { useEffect } from 'react';

import AptRegister from '../components/AptRegister/AptRegister';
import styled from '@emotion/styled';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Container>
        <Header header="아파트 커뮤니티 가입" />
        <AptRegister></AptRegister>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default MainPage;
