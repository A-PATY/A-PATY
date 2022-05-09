import { useEffect } from 'react';
import FindFamily from '../components/FindFamily/FindFamily';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import Header from '../components/common/Header';

const FindFamilyPage: React.FC = () => {
  useEffect(() => {
    document.title = '게시글 상세 조회';
  }, []);

  return (
    <>
      <Container>
        <Header header="가족 찾기" />
        <FindFamily />
      </Container>
      <Footer footerNumber={3}/>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
  position: relative;
  overflow: hidden;
`;

export default FindFamilyPage;
