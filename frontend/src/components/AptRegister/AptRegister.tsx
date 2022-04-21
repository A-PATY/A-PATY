import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const AptRegister: React.FC = () => {
  return (
    <>
      <FirstSection>
        <InfoContainer>
          <Phrase>아파트 커뮤니티에 가입하면,</Phrase>
          <Phrase>더 유용한 정보를 주민끼리 공유할 수 있어요.</Phrase>
          <Phrase>우리 아파트를 찾아 가입해보세요!</Phrase>
        </InfoContainer>
        <AptButton variant="contained">우리 아파트 찾기</AptButton>
      </FirstSection>
    </>
  );
};

const FirstSection = styled.section`
  background: #fbf7f2;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  height: calc((100% - 70px) - 70px);
  overflow-y: auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin: 0 40px;
`;

const Phrase = styled.p`
  box-sizing: border-box;
  margin: 2px;
  padding: 0;
  text-align: center;
  line-height: 130%;
  color: rgb(140, 136, 136);
`;

const AptButton = styled(Button)`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0px;
  border: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 4px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #BAE6E5;
  box-shadow: none;
  color: white;
  margin: 10px 30px 30px;
  &:hover {
    text-decoration: none;
    background-color: #95c1c1;
    box-shadow: none;
  }
`;


export default AptRegister;
