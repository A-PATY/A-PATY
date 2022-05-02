import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ProfileImageList from '../MyPage/ProfileImageList';
import TextField from '@mui/material/TextField';

const NewMemberMain: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const handleModifyButtonClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Container>
        <FormWrapper>
          <Wrapper>
            <ImageWrapper>
              <Image src="\img\image0.svg" />
              <ModifyButton onClick={handleModifyButtonClick}>
                <AutoFixHighIconCustom />
              </ModifyButton>
            </ImageWrapper>
            <StyledTextField
              variant="outlined"
              label={'이름'}
            ></StyledTextField>
            <StyledTextField
              variant="outlined"
              label={'닉네임'}
            ></StyledTextField>
            <CustomButtom>주소</CustomButtom>
            <CustomButtom>회원가입</CustomButtom>
          </Wrapper>
        </FormWrapper>
      </Container>
      <ProfileImageList open={open} onClose={handleClose} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  height: calc((100% - 70px) - 70px);
  overflow-y: auto;
`;

const FormWrapper = styled.form`
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  padding: 15px 0px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 80px;
  margin: 20px;
`;

const ModifyButton = styled(IconButton)`
  position: absolute;
  border-radius: 20px;
  background-color: white;
  bottom: 20px;
  left: 75px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
`;

const AutoFixHighIconCustom = styled(BorderColorRoundedIcon)`
  font-size: 12px;
`;

const StyledTextField = styled(TextField)`
  margin: 3.2px 0px 10px 0px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  width: 250px;
  border: none;
  border-radius: 126px;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;

  & .MuiOutlinedInput-notchedOutline {
    border-style: none;
  }
`;

const CustomButtom = styled(Button)`
  background-color: #ffd0b6;
  margin: 10px 0px 0px;
  color: white;
  width: 250px;
  height: 50px;
  border-radius: 126px;

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #ffb2a9;
  }
`;
export default NewMemberMain;
