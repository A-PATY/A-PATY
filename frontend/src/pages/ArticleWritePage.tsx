import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import ArticleWrite from '../components/Article/ArticleWrite';
import ArticleHeader from '../components/Article/ArticleHeader';
import { useLocation } from 'react-router-dom';
import { getCookie } from '../hooks/Cookie';
import Swal from 'sweetalert2';
import { useRecoilValue } from 'recoil';
import { presentCommunityTypeState } from '../features/Board/atom';

const ArticleWritePage: React.FC = () => {
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

  const location = useLocation();
  const state = location.state as {
    type: number;
    communityId: number | undefined;
  };
  const { type, communityId } = state;

  const presentCommunityType = useRecoilValue(presentCommunityTypeState);

  const title =
    presentCommunityType === 1
      ? '지역 커뮤니티 글 작성'
      : presentCommunityType === 2
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
