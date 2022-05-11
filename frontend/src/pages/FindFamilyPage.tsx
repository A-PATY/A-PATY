import { useEffect } from 'react';
import FindFamily from '../components/FindFamily/FindFamily';
import BeforeAptRegister from '../components/FindFamily/BeforeAptRegister';
import Footer from '../components/common/Footer';
import styled from '@emotion/styled';
import Header from '../components/common/Header';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../features/Login/atom';
import { UserInfo } from '../types/loginTypes';

const FindFamilyPage: React.FC = () => {
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState);

  useEffect(() => {
    document.title = "가족 위치 찾기";
  }, []);

  return (
    <>
      <Container>
        <Header header="가족 찾기"/>
        {
          userInfo?.aptName ?
          <FindFamily /> :
          <BeforeAptRegister/>
        }
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
