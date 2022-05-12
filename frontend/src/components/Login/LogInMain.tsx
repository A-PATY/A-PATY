import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const LogInMain: React.FC = () => {
  const REDIRECT_URI = 'https://apaty.co.kr/oauth/callback/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_AUTH_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // 배포 후 삭제
  const TEST_REDIRECT_URI = 'http://localhost:3000/oauth/callback/kakao';
  const KAKAO_TEST_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_AUTH_REST_API_KEY}&redirect_uri=${TEST_REDIRECT_URI}&response_type=code`;
  //

  const handleButtomCustomClick = (
    event: React.MouseEvent<HTMLImageElement>,
  ) => {
    // 배포 후 삭제
    if (window.location.href === 'http://localhost:3000/login') {
      window.location.href = KAKAO_TEST_AUTH_URL;
    } else {
      window.location.href = KAKAO_AUTH_URL;
    }
    //

    //배포 후 살리기
    // window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Container>
        <BoxCustom>
          <Image src="\img\\main.gif"></Image>
        </BoxCustom>
        <KakaoImage
          onClick={handleButtomCustomClick}
          src="\img\kakao_login_medium_wide.png"
        ></KakaoImage>
        {/* <ButtonCustom >
          카카오로 시작하기
        </ButtonCustom> */}
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

const KakaoImage = styled.img`
  width: 300px;
  height: 45px;

  &:hover {
    cursor: pointer;
  }
`;
const ButtomWrapper = styled(Box)`
  margin: 0.8px 0px 0px;
`;

const ButtonCustom = styled(Button)`
  background-color: #fee500;
  margin: 10px 0px 0px;
  box-shadow: none;
  color: #000000 85%;
  width: 300px;
  min-height: 56px;
  border-radius: 12px;
  font-family: 'MinSans-Regular';
  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #ffb2a9;
  }
`;
export default LogInMain;
