import styled from '@emotion/styled';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  let navigate = useNavigate();

  const handleButtonCustomClick = () => {
    navigate('/login');
  };
  return (
    <>
      <FirstBox>
        <FirstSection>
          <Box>
            <Container>
              <BoxCustom>
                <Text>A101 아파트 커뮤니티</Text>
              </BoxCustom>
              <ButtonCustom
                variant="contained"
                onClick={handleButtonCustomClick}
              >
                시작하기
              </ButtonCustom>
            </Container>
          </Box>
        </FirstSection>
      </FirstBox>
    </>
  );
};

const FirstBox = styled(Box)`
  height: 100vh;
`;
const FirstSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  overflow-x: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: scale(100%);
  transition: 2s;
  align-items: center;
  display: flex;
  margin: 20px;
`;

const BoxCustom = styled(Box)`
  font-size: 30px;
  color: #ffb2a9;
`;

const Text = styled.p``;

const ButtonCustom = styled(Button)`
  background-color: #ffd0b6;
  margin: 20px;
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
export default Main;
