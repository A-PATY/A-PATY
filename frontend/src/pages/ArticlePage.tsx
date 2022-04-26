import { useEffect } from 'react';
import ArticleHeader from '../components/Login/LogInHeader';
import Article from '../components/Article/Article';

const ArticlePage: React.FC = () => {
  useEffect(() => {
    document.title = '게시글 상세 조회';
  }, []);

  return (
    <>
      <ArticleHeader />
      <Article />
    </>
  );
};

export default ArticlePage;
