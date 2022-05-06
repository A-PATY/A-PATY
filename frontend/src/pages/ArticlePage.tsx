import { useEffect } from 'react';
import Article from '../components/Article/Article';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import Header from '../components/common/Header';

const ArticlePage: React.FC = () => {
  useEffect(() => {
    document.title = '게시글 상세 조회';
  }, []);

  return (
    <>
      <Container>
        <Header header="게시글" />
        <Article />
      </Container>
      {/* <Footer footerNumber={1} /> */}
      <Footer footerNumber={-1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;

export default ArticlePage;
