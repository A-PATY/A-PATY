import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Button from '@mui/material/Button';
import ProfileImageList from './ProfileImageList';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '../../features/Login/atom';
import Switch from '@mui/material/Switch';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { UserInfo } from '../../types/loginTypes';
import useProfileImageList from '../../hooks/useProfileImageList';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import UserService from '../../services/UserService';
import Swal from 'sweetalert2';
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded';
import UserLocation from '../../hooks/useUserLocation';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const MyPageMain: React.FC = () => {
  const itemData = useProfileImageList();
  const userInfo: UserInfo | null = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const [nickname, setNickname] = useState<string>('');
  const [nicknameReadOnly, setNicknameReadOnly] = useState<boolean>(true);
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [addressName, setAddressName] = useState<string>('');
  const [addressReadOnly, setAddressReadOnly] = useState<boolean>(true);
  const [addressError, setAddressError] = useState<boolean>(false);
  const [profileImgId, setProfileImgId] = useState<number>(-1);
  const [profileImgUrl, setProfileImgUrl] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [findFamilyChecked, setFindFamilyChecked] = useState<boolean>(false);
  let { x, y } = UserLocation();

  useEffect(() => {
    if (nickname === '') {
      setNicknameError(true);
    } else {
      setNicknameError(false);
    }
  }, [nickname]);

  useEffect(() => {
    if (userInfo !== null) {
      setNickname(userInfo.nickname);
      setAddressName(
        `${userInfo.sidoName} ${userInfo.gugunName} ${userInfo.dongName}`,
      );
      setProfileImgId(userInfo.profileImgId);
      if (itemData !== undefined) {
        let itemIndex = itemData.findIndex((item) => {
          return item.profileImgId === userInfo.profileImgId;
        });
        if (itemIndex !== -1) {
          setProfileImgUrl(itemData[itemIndex].profileImgUrl);
        }
      }
      setFindFamilyChecked(userInfo?.findFamily);
    }
  }, [itemData, userInfo]);

  useEffect(() => {
    if (profileImgId !== userInfo?.profileImgId) {
      const profileImgIdFormData = new FormData();
      profileImgIdFormData.append('profileImgId', profileImgId as any);
      UserService.modifyUserInfo({
        profileInfo: 'profileImgId',
        data: profileImgIdFormData,
      })
        .then((response) => {})
        .catch(({ message }) => {
          Swal.fire({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .finally(() => {
          UserService.getUserInfo()
            .then(({ userInfo }) => {
              setUserInfo(userInfo);
            })
            .catch(({ message }) => {
              Swal.fire({
                title: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
              });
            });
        });
    }
  }, [profileImgId, userInfo?.profileImgId]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleModifyButtonClick = () => {
    setOpen(true);
  };

  const handleNicknameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNickname(event.target.value);
  };

  const handleNicknameModifyIconClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setNicknameReadOnly(false);
  };

  const handleNicknameConfirmIconClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (nickname !== userInfo?.nickname && !nicknameError) {
      setNicknameReadOnly(true);
      const nicknameFormData = new FormData();
      nicknameFormData.append('nickname', nickname);
      UserService.modifyUserInfo({
        profileInfo: 'nickname',
        data: nicknameFormData,
      })
        .then((response) => {})
        .catch(({ message }) => {
          Swal.fire({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .finally(() => {
          UserService.getUserInfo()
            .then(({ userInfo }) => {
              setUserInfo(userInfo);
            })
            .catch(({ message }) => {
              Swal.fire({
                title: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
              });
            });
        });
    }
  };

  const handleAddressModifyIconClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    Swal.fire({
      title: '주소 수정 시, 알림 사항 ',
      text: '주소를 변경하게 되면 현재 이용 중인 커뮤니티를 더 이상 이용할 수 없습니다.',
      showDenyButton: true,
      confirmButtonText: '수정하기',
      denyButtonText: `취소하기`,
    }).then((result) => {
      if (result.isConfirmed) {
        setAddressReadOnly(false);
      } else if (result.isDenied) {
        setAddressReadOnly(true);
      }
    });
  };

  const handleAddressConfirmIconClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setAddressReadOnly(true);

    if (
      addressName !==
      `${userInfo?.sidoName} ${userInfo?.gugunName} ${userInfo?.dongName}`
    ) {
      const addressFormData = new FormData();
      addressFormData.append('address', address);
      UserService.modifyUserInfo({
        profileInfo: 'address',
        data: addressFormData,
      })
        .then((response) => {
          UserService.getUserInfo()
            .then(({ userInfo }) => {
              setUserInfo(userInfo);
            })
            .catch(({ message }) => {
              Swal.fire({
                title: message,
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
              });
            });
        })
        .catch(({ message }) => {
          Swal.fire({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  const handleGpsIconClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    UserService.getUserAddress({ x, y })
      .then((response) => {
        setAddress(response.documents[0].code);
        setAddressName(response.documents[0].address_name);
        setAddressError(false);
      })
      .catch((error) => {
        Swal.fire({
          title: '위치 기반 주소 검색에 실패했습니다.',
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const handleFindFamilySwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const findFamilyFormData = new FormData();
    findFamilyFormData.append('findFamily', !findFamilyChecked as any);
    UserService.modifyUserInfo({
      profileInfo: 'findFamily',
      data: findFamilyFormData,
    })
      .then((response) => {})
      .catch(({ message }) => {
        Swal.fire({
          title: message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => {
        UserService.getUserInfo()
          .then(({ userInfo }) => {
            setUserInfo(userInfo);
          })
          .catch(({ message }) => {
            Swal.fire({
              title: message,
              icon: 'error',
              showConfirmButton: false,
              timer: 2000,
            });
          });
      });
  };
  console.log(findFamilyChecked);
  return (
    <>
      <Container>
        <Wrapper>
          <ImageWrapper>
            <Image src={profileImgUrl} />
            <ModifyButton onClick={handleModifyButtonClick}>
              <AutoFixHighIconCustom />
            </ModifyButton>
          </ImageWrapper>
          <StyledTextFieldWrapper>
            <StyledTextField
              value={nickname}
              variant="outlined"
              label={'닉네임'}
              error={nicknameError}
              helperText={nicknameError ? '닉네임을 입력해주세요.' : ''}
              onChange={handleNicknameInputChange}
              InputProps={{
                readOnly: nicknameReadOnly,
                endAdornment: (
                  <InputAdornment position="end">
                    {nicknameReadOnly ? (
                      <GpsIconWrapper onClick={handleNicknameModifyIconClick}>
                        <ModifyIcon />
                      </GpsIconWrapper>
                    ) : (
                      <GpsIconWrapper
                        onClick={handleNicknameConfirmIconClick}
                        className={nicknameError ? 'error' : undefined}
                      >
                        <ConfirmIcon />
                      </GpsIconWrapper>
                    )}
                  </InputAdornment>
                ),
              }}
            ></StyledTextField>
          </StyledTextFieldWrapper>

          <StyledTextFieldWrapper>
            <StyledTextField
              value={addressName}
              variant="outlined"
              label={'주소'}
              error={addressError}
              helperText={
                addressError ? '우측 아이콘을 눌러 주소를 인증해주세요.' : ''
              }
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {addressReadOnly ? (
                      <GpsIconWrapper onClick={handleAddressModifyIconClick}>
                        <ModifyIcon />
                      </GpsIconWrapper>
                    ) : (
                      <>
                        <GpsIconWrapper onClick={handleGpsIconClick}>
                          <GpsFixedRoundedIcon />
                        </GpsIconWrapper>
                        <GpsIconWrapper onClick={handleAddressConfirmIconClick}>
                          <ConfirmIcon />
                        </GpsIconWrapper>
                      </>
                    )}
                  </InputAdornment>
                ),
              }}
            ></StyledTextField>
          </StyledTextFieldWrapper>

          <StyledTextFieldWrapper>
            <FindFamilyButton>
              가족 찾기{' '}
              <Switch
                {...label}
                color="secondary"
                checked={findFamilyChecked}
                onChange={handleFindFamilySwitchChange}
              />
            </FindFamilyButton>
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <SignUpButton>로그아웃</SignUpButton>
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <SignUpButton>탈퇴하기</SignUpButton>
          </StyledTextFieldWrapper>
        </Wrapper>
      </Container>
      {itemData !== undefined ? (
        <ProfileImageList
          open={open}
          onClose={handleClose}
          setProfileImgId={setProfileImgId}
          setProfileImgUrl={setProfileImgUrl}
          itemData={itemData}
        />
      ) : undefined}
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

  &::-webkit-scrollbar {
    display: none;
  }
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

  &:nth-of-type(5) {
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
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }

  &.error {
    cursor: not-allowed;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #ffd0b6;
  color: white;
  width: 250px;
  height: 50px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #ffb2a9;
  }
`;

const FindFamilyButton = styled(Button)`
  justify-content: space-between;
  background-color: #e4d2ee;
  color: white;
  width: 250px;
  height: 50px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';
  padding: 16.5px 14px;
  padding-right: 7px;

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #e4d2ee;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20% 5% 5%;
`;
// const ImageWrapper = styled.div`
//   position: relative;
// `;

// const Image = styled.img`
//   width: 60px;
// `;

// const ModifyButton = styled(IconButton)`
//   position: absolute;
//   border-radius: 20px;
//   background-color: white;
//   bottom: 0px;
//   left: 45px;
//   width: 25px;
//   height: 25px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
// `;

// const AutoFixHighIconCustom = styled(BorderColorRoundedIcon)`
//   font-size: 12px;
// `;

// const NicknameContainer = styled.div`
//   margin: 0px 0px 0px 24px;
//   display: flex;
//   flex-direction: column;
// `;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nickname = styled.p`
  //수정 시 input으로 변환
  font-size: 15px;
`;

const ModifyIcon = styled(CreateRoundedIcon)`
  color: #8c8888;
`;

const ConfirmIcon = styled(CheckRoundedIcon)`
  color: #8c8888;
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxCustom = styled(Box)`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
