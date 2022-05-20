import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const BeforeAptRegister : React.FC = () => {
  const navigate = useNavigate();

  const handleOpen = () => { 
    navigate('/apt_register');
  };

  return (
    <>
      <FirstSection>
        <InfoContainer>
          <Phrase>가족찾기를 이용하려면</Phrase>
          <Phrase>아파트 커뮤니티에 가입해주세요.</Phrase>
        </InfoContainer>
        <AptButton variant="contained" onClick={handleOpen}>
          커뮤니티 가입하러 가기
        </AptButton>
      </FirstSection>
    </>
  );
};

const FirstSection = styled.section`
  background: #fffdfb;
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
  justify-content: center;
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
  font-family: 'MinSans-Regular';
  cursor: pointer;
  font-weight: 500;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 4px;
  background-color: #bae6e5;
  box-shadow: none;
  color: white;
  margin: 10px 30px 30px;

  &:hover {
    text-decoration: none;
    background-color: #95c1c1;
    box-shadow: none;
  }
`;

export default BeforeAptRegister;
