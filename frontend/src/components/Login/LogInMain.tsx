import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UserService from '../../services/UserService';
const LogInMain: React.FC = () => {
  const code = '11111';
  const handleButtomCustomClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    UserService.getUserKakaoToken(code)
      .then(({ message }) => {
        alert(message);
      })
      .catch((error) => {
        if (error.response) {
          const { status, message } = error.response.data;

          switch (status) {
            case 400:
              alert(message);
              break;
            case 500:
              alert(message);
              break;
          }
        }
      });
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
