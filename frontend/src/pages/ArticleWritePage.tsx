import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import ArticleWrite from '../components/Article/ArticleWrite';
import ArticleWriteHeader from '../components/Article/ArticleWriteHeader';

const ArticleWritePage: React.FC = () => {
  useEffect(() => {
    document.title = '게시글 작성';
  }, []);

  return (
    <>
      <Container>
        <ArticleWriteHeader header="지역/아파트 커뮤니티 작성" />
        <ArticleWrite />
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

export default ArticleWritePage;
