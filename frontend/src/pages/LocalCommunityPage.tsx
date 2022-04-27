import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import BoardList from '../components/Community/Local/BoardList';
import LocalHeader from '../components/Community/Local/LocalHeader';

const LocalCommunityPage: React.FC = () => {
  useEffect(() => {
    document.title = '지역 커뮤니티';
  }, []);

  return (
    <>
      <Container>
        <LocalHeader />
        <BoardList />
      </Container>
      <Footer footerNumber={1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default LocalCommunityPage;
