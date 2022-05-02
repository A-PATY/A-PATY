import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import KakaoCallbackMain from '../components/Login/KakaoCallbackMain';
import SignUpMain from '../components/Login/KakaoCallbackMain';
import MyPageMain from '../components/MyPage/MyPageMain';

const KakaoCallbackPage: React.FC = () => {
  useEffect(() => {
    document.title = '카카오';
  }, []);

  return (
    <>
      <Container>
        <KakaoCallbackMain />
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
export default KakaoCallbackPage;
