import styled from '@emotion/styled';
import { useEffect } from 'react';
import LogInFooter from '../components/Login/LogInFooter';
import LogInHeader from '../components/Login/LogInHeader';
import LogInMain from '../components/Login/LogInMain';

const LogInPage: React.FC = () => {
  useEffect(() => {
    document.title = '로그인';
  }, []);

  return (
    <>
      <Container>
        <LogInHeader />
        <LogInMain />
      </Container>
      <LogInFooter />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default LogInPage;
