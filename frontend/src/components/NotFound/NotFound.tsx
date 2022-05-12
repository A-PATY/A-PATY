import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  let navigate = useNavigate();

  const handleButtonCustomClick = () => {
    navigate('/');
  };

  return (
    <>
      <Container>
        <BoxCustom>
          <ImgBox>
            <NotFoundImg src="/img/404.png" />
          </ImgBox>
          <MainText>요청하신 페이지를 찾을 수 없습니다</MainText>
          <SubText>입력하신 주소를 다시 한번 확인해 주세요</SubText>
        </BoxCustom>
        <ButtonCustom
          variant="contained"
          onClick={handleButtonCustomClick}
        >
          메인으로 이동
        </ButtonCustom>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: scale(100%);
  transition: 2s;
  align-items: center;
  display: flex;
  margin: auto 20px;
`;

const BoxCustom = styled(Box)`
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  font-family: 'MinSans-Regular';
  line-height: 1.8rem;
`;

const ImgBox = styled.div`
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const motion = keyframes`
  0% {margin-top: 0px;} 
	100% {margin-top: 10px;} 
`;

const NotFoundImg = styled.img`
  width: 90%;
  margin-bottom: 20px;
  animation: ${motion} 0.9s linear 0s infinite alternate; 
  object-fit: contain;
`;

const MainText = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
`;

const SubText = styled.p`
  font-size: 1rem;
`;

const ButtonCustom = styled(Button)`
  background-color: #ffd0b6;
  margin: 20px;
  box-shadow: none;
  color: white;
  /* width: 50%; */
  width: 180px;
  min-height: 50px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #ffb2a9;
  }
`;
export default NotFound;
