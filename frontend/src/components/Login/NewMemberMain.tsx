import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import ProfileImageList from '../MyPage/ProfileImageList';
import TextField from '@mui/material/TextField';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
import InputAdornment from '@mui/material/InputAdornment';
import UserService from '../../services/UserService';
import UserLocation from '../../hooks/useUserLocation';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setMaxListeners } from 'process';

const NewMemberMain: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [profileImgId, setProfileImgId] = useState<number>(1);
  const [profileImgUrl, setProfileImgUrl] =
    useState<string>('\\img\\image0.svg');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [addressName, setAddressName] = useState<string>('');
  const [addressError, setAddressError] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  let { x, y } = UserLocation();

  useEffect(() => {
    if (name === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (nickname === '') {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
    if (address === '') {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  }, [address, name, nickname]);

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(event.target.value);
    if (event.target.value === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleNicknameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNickname(event.target.value);
    if (event.target.value === '') {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
  };

  const handleGpsIconClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    UserService.getUserAddress({ x, y })
      .then((response) => {
        console.log(response);
        setAddress(response.documents[0].code);
        setAddressName(response.documents[0].address_name);
        setAddressError(false);
      })
      .catch((error) => {});
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyButtonClick = () => {
    setOpen(true);
  };

  const handleSignUpButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!nameError && !nicknameError && !addressError) {
      UserService.signUpRequest({
        address: address,
        nickName: nickname,
        name: name,
        profileImgId: profileImgId,
      })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      <Container>
        <FormWrapper>
          <Wrapper>
            <ImageWrapper>
              <Image src={profileImgUrl} />
              <ModifyButton onClick={handleModifyButtonClick}>
                <AutoFixHighIconCustom />
              </ModifyButton>
            </ImageWrapper>
            <StyledTextFieldWrapper>
              <StyledTextField
                value={name}
                variant="outlined"
                label={'이름'}
                error={showError && nameError}
                helperText={
                  showError && nameError ? '이름을 입력해주세요.' : ''
                }
                onChange={handleNameInputChange}
              ></StyledTextField>
            </StyledTextFieldWrapper>
            <StyledTextFieldWrapper>
              <StyledTextField
                value={nickname}
                variant="outlined"
                label={'닉네임'}
                error={showError && nicknameError}
                helperText={
                  showError && nicknameError ? '닉네임을 입력해주세요.' : ''
                }
                onChange={handleNicknameInputChange}
              ></StyledTextField>
            </StyledTextFieldWrapper>
            <StyledTextFieldWrapper>
              <StyledTextField
                value={addressName}
                variant="outlined"
                label={'주소'}
                error={showError && addressError}
                helperText={
                  showError && addressError
                    ? '우측 아이콘을 눌러 주소를 인증해주세요.'
                    : ''
                }
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <GpsIconWrapper onClick={handleGpsIconClick}>
                        <GpsFixedRoundedIcon />
                      </GpsIconWrapper>
                    </InputAdornment>
                  ),
                }}
              ></StyledTextField>
            </StyledTextFieldWrapper>

            <StyledTextFieldWrapper>
              <SignUpButton onClick={handleSignUpButtonClick}>
                회원가입
              </SignUpButton>
            </StyledTextFieldWrapper>
          </Wrapper>
        </FormWrapper>
      </Container>
      <ProfileImageList
        open={open}
        onClose={handleClose}
        setProfileImgId={setProfileImgId}
        setProfileImgUrl={setProfileImgUrl}
      />
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

const StyledTextFieldWrapper = styled.div`
  margin-top: 10px;

  &:last-child {
    margin-top: 30px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputLabel-root {
    font-family: 'MinSans-Regular';
    font-size: 14px;

    &.Mui-error {
      color: #ffb2a9;
    }

    &.Mui-focused {
      color: #000;
    }
  }

  & .MuiOutlinedInput-root {
    overflow: hidden;
    border: none;
    border-radius: 31.5px;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;
    font-family: 'MinSans-Regular';
    font-size: 14px;
    width: 250px;
    height: 50px;
    background-color: rgb(255, 255, 255);
  }

  & .MuiOutlinedInput-notchedOutline {
    border-style: none;
  }

  & .MuiFormHelperText-root {
    color: #ffb2a9;
    font-family: 'MinSans-Regular';

    &.Mui-error {
      color: #ffb2a9;
    }
  }
`;

const GpsIconWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #ffd0b6;
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
