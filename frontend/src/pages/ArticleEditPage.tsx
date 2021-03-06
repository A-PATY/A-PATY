import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import ArticleEdit from '../components/Article/ArticleEdit';
import ArticleHeader from '../components/Article/ArticleHeader';
import { article } from '../types/boardTypes';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../hooks/Cookie';
import Swal from 'sweetalert2';
import { useRecoilValue } from 'recoil';
import { presentCommunityTypeState } from '../features/Board/atom';

// interface Props {
//   article: article;
// }

const ArticleEditPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as { article: article };

  useEffect(() => {
    document.title = '게시글 작성';
  }, []);

  const refreshToken = getCookie('apaty_refresh');

  useEffect(() => {
    if (refreshToken === undefined) {
      Swal.fire({
        title: '로그인 후 서비스 이용해주세요.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.replace('/');
    }
  }, []);

  const { article } = state;

  const presentCommunityType = useRecoilValue(presentCommunityTypeState);

  const title =
    presentCommunityType === 1
      ? '지역 커뮤니티 글 수정'
      : presentCommunityType === 2
      ? '아파트 커뮤니티 글 수정'
      : '아파트 익명 커뮤니티 글 수정';

  return (
    <>
      <Container>
        <ArticleHeader header={title} />
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
