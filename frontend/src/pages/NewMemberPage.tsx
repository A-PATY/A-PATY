import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NewMemberMain from '../components/Login/NewMemberMain';

const MyPage: React.FC = () => {
  useEffect(() => {
    document.title = '회원 정보 입력';
  }, []);

  return (
    <>
      <Container>
        <Header header="회원 정보 입력" />
        <NewMemberMain />
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
export default MyPage;
