import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Button from '@mui/material/Button';
import ProfileImageList from './ProfileImageList';
import { useState } from 'react';

const MyPageMain: React.FC = () => {
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
        <ProfileWrapper>
          <ImageWrapper>
            <Image src="\img\image0.svg" />
            <ModifyButton onClick={handleModifyButtonClick}>
              <AutoFixHighIconCustom />
            </ModifyButton>
          </ImageWrapper>
          <NicknameContainer>
            <NicknameWrapper>
              <Nickname>장미</Nickname>
              <ModifyIcon />
            </NicknameWrapper>
          </NicknameContainer>
        </ProfileWrapper>
        <AddressWrapper>
          <BoxCustom>
            <AddressListWrapper>
              <AddressValueWrapper>
                <RoomRoundedIconCustom />
                <AddressText>장미시 장미구 장미동</AddressText>
                <ModifyIcon />
              </AddressValueWrapper>
            </AddressListWrapper>
          </BoxCustom>
        </AddressWrapper>
        <ButtonsWrapper>
          <ButtonCustom>로그아웃</ButtonCustom>
          <ButtonCustom>회원 탈퇴</ButtonCustom>
        </ButtonsWrapper>
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

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20% 5% 5%;
`;
const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 60px;
`;

const ModifyButton = styled(IconButton)`
  position: absolute;
  border-radius: 20px;
  background-color: white;
  bottom: 0px;
  left: 45px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
`;

const AutoFixHighIconCustom = styled(BorderColorRoundedIcon)`
  font-size: 12px;
`;

const NicknameContainer = styled.div`
  margin: 0px 0px 0px 24px;
  display: flex;
  flex-direction: column;
`;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nickname = styled.p`
  //수정 시 input으로 변환
  font-size: 15px;
`;

const ModifyIcon = styled(BorderColorRoundedIcon)`
  margin: 0px 0px 0px 16px;
  color: #8c8888;
  height: 15px;
  opacity: 0.4;
  width: 15px;
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxCustom = styled(Box)`
  height: 140px;
`;

const AddressListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddressValueWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RoomRoundedIconCustom = styled(RoomRoundedIcon)`
  color: #8c8888;
  height: 20px;
  opacity: 0.8;
  width: 20px;
`;

const AddressText = styled.p`
  margin: 0px 0px 0px 16px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
`;

const ButtonCustom = styled(Button)`
  background-color: #ffd0b6;
  margin: 10px 0px 0px;
  box-shadow: none;
  color: white;
  width: 300px;
  min-height: 56px;
  border-radius: 126px;

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #ffb2a9;
  }
`;
export default MyPageMain;
