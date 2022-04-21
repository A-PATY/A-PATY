import styled from '@emotion/styled';
import { useEffect } from 'react';
import LogInFooter from '../components/Login/LogInFooter';
import LogInHeader from '../components/Login/LogInHeader';
import MyPageMain from '../components/MyPage/MyPageMain';

const MyPage: React.FC = () => {
  useEffect(() => {
    document.title = '로그인';
  }, []);

  return (
    <>
      <Container>
        <LogInHeader />
        <MyPageMain />
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
export default MyPage;
