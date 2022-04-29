import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import SignUpMain from '../components/Login/SignUpMain';
import MyPageMain from '../components/MyPage/MyPageMain';

const SignUpPage: React.FC = () => {
  useEffect(() => {
    document.title = '회원가입';
  }, []);

  return (
    <>
      <Container>
        <Header header="추가 정보 입력" />
        <SignUpMain />
      </Container>
      <Footer footerNumber={-1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default SignUpPage;
