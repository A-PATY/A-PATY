import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import ArticleEdit from '../components/Article/ArticleEdit';
import ArticleHeader from '../components/Article/ArticleHeader';
import { article } from '../types/boardTypes';
import { useLocation } from 'react-router-dom';

// interface Props {
//   article: article;
// }

const ArticleEditPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { article: article };

  useEffect(() => {
    document.title = '게시글 작성';
  }, []);

  const { article } = state;
  console.log(location);
  console.log(article);

  return (
    <>
      <Container>
        <ArticleHeader header="지역/아파트 커뮤니티 수정" />
        <ArticleEdit article={article} />
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
