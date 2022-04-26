import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import LogInMain from '../components/Login/LogInMain';

const LogInPage: React.FC = () => {
  useEffect(() => {
    document.title = '로그인';
  }, []);

  return (
    <>
      <Container>
        <Header header="로그인" />
        <LogInMain />
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
export default LogInPage;
