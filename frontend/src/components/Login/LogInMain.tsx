import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
const LogInMain: React.FC = () => {
  const REST_API_KEY = '9f8212ade1576047ddcf60fd0ab79a2e';
  const REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleButtomCustomClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    window.location.href = KAKAO_AUTH_URL;
  };
  return (
    <>
      <Container>
        <BoxCustom>
          <Image src="\img\\main.gif"></Image>
        </BoxCustom>
        <ButtonCustom onClick={handleButtomCustomClick}>
          카카오 로그인
        </ButtonCustom>
        {/* <ButtonCustom>네이버 로그인</ButtonCustom>
        <ButtonCustom>구글 로그인</ButtonCustom> */}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc((100% - 70px) - 70px);
  text-align: center;
  flex: 1 1 auto;
  overflow-y: auto;
`;

const BoxCustom = styled(Box)`
  height: 200px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin: 10px auto;
`;

const ButtomWrapper = styled(Box)`
  margin: 0.8px 0px 0px;
`;

const ButtonCustom = styled(Button)`
  background-color: #ffd0b6;
  margin: 10px 0px 0px;
  box-shadow: none;
  color: white;
  width: 300px;
  min-height: 56px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #ffb2a9;
  }
`;
export default LogInMain;
