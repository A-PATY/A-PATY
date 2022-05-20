import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NotFound from '../components/NotFound/NotFound';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '페이지를 찾을 수 없습니다';
  }, []);

  return (
    <>
      <Container>
        <Header header=""/>
        <NotFound/>
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
export default NotFoundPage;
