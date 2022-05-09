import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import ArticleEdit from '../components/Article/ArticleEdit';
import ArticleHeader from '../components/Article/ArticleHeader';

const ArticleEditPage: React.FC = () => {
  useEffect(() => {
    document.title = '게시글 작성';
  }, []);

  return (
    <>
      <Container>
        <ArticleHeader header="지역/아파트 커뮤니티 수정" />
        <ArticleEdit />
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

export default ArticleEditPage;
