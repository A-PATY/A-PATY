import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import KakaoCallbackMain from '../components/Login/KakaoCallbackMain';

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
