import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import ArticleWrite from '../components/Article/ArticleWrite';
import ArticleHeader from '../components/Article/ArticleHeader';
import { useLocation } from 'react-router-dom';

const ArticleWritePage: React.FC = () => {
  useEffect(() => {
    document.title = '게시글 작성';
  }, []);

  const location = useLocation();
  const state = location.state as {
    type: number;
    communityId: number | undefined;
  };
  const { type, communityId } = state;
  const title =
    type === 1
      ? '지역 커뮤니티 글 작성'
      : type === 2
      ? '아파트 커뮤니티 글 작성'
      : '아파트 익명 커뮤니티 글 작성';

  return (
    <>
      <Container>
        <ArticleHeader header={title} />
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
