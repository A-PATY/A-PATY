import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import Button from '@mui/material/Button';
import ProfileImageList from './ProfileImageList';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState, updatedUser } from '../../features/Login/atom';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
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
import { useNavigate } from 'react-router-dom';
import { getCookie, removeCookie } from '../../hooks/Cookie';

import { firestore } from '../../firebase';
import { getDoc, updateDoc, doc, onSnapshot, setDoc, addDoc } from 'firebase/firestore';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const marks = [
  {
    value: 33,
    label: '100',
    range: 100,
  },
  {
    value: 66,
    label: '200',
    range: 200,
  },
  {
    value: 100,
    label: '400',
    range: 400,
  },
];

function valuetext(value: number) {
  return `${value}`;
};

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

  const [range, setRange] = useState({ value: 33, range: 100});
  const [intialValue, setintialValue] = useState<number>(33);
  const userId = useRecoilValue(updatedUser);
  const familyId = userInfo?.aptId.toString() + "-" + userInfo?.dong + "-" + userInfo?.ho
  
  let navigate = useNavigate();

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
    if (profileImgId !== userInfo?.profileImgId && profileImgId !== -1) {
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

  useEffect(() => {
    if (userInfo && userInfo.aptName) {
      const docRef = doc(firestore, "families", familyId);
      
      getDoc(docRef).then(res => {
        const index = marks.findIndex((mark) => mark.range === res.get('range'));
        setintialValue(marks[index].value);
      })
    }
  }, [userId]);

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

  const handleDeleteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    UserService.deleteUser()
      .then(({ message }) => {
        Swal.fire({
          title: message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/');
      })
      .catch(({ message }) => {
        Swal.fire({
          title: message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const handleLogOutButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    UserService.logOutUser()
      .then(({ message }) => {
        removeCookie('apaty_refresh', { path: '/' });
        Swal.fire({
          title: message,
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.href = '/';
      })
      .catch(({ message }) => {
        Swal.fire({
          title: message,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const valueLabelFormat = (value: number) => {
    const index = marks.findIndex((mark) => mark.value === value);
    const selectedRange = marks[index].range
    
    if (selectedRange !== range.range) {
      setRange({
        value: marks[index].value,
        range: selectedRange
      });

      if (familyId) {
        const docRef = doc(firestore, "families", familyId);
        getDoc(docRef).then(res => {
          if (userInfo !== null && res.get('range') !== selectedRange) {
            updateDoc(docRef, {
              range : selectedRange
            });
          }
        })
      }
    }
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

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

          <StyledTextFieldWrapper style={{ display: userInfo?.findFamily ? "" : "none" }}>
            <FindFamilyButton>
              아파트 범위(m){''}
              <SliderCustom
              key={`slider-${intialValue}`}
              defaultValue={intialValue}
              getAriaValueText={valuetext}
              valueLabelFormat={valueLabelFormat}
              step={null}
              marks={marks}
            />
            </FindFamilyButton>
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <LogOutButton onClick={handleLogOutButtonClick}>
              로그아웃
            </LogOutButton>
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <DeleteButton onClick={handleDeleteButtonClick}>
              탈퇴하기
            </DeleteButton>
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

  &:nth-of-type(6) {
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

const SliderCustom = styled(Slider)`
  width: 100px;
  margin-top: 20px;
  margin-right: 18px;
  color: #9c27b0;
  & .MuiSlider-thumb {
    width: 15px;
    height: 15px;
  }
  & .MuiSlider-thumb.Mui-focusVisible {
    box-shadow: 0 0 0 8px #f4f1f580;
  }
  & .MuiSlider-thumb:hover {
    box-shadow: 0 0 0 8px #f4f1f580;
  }
  & .Mui-focusVisible {
    box-shadow: none;
  }
  & .MuiSlider-markLabel {
    color: #fff;
    font-size: 10px;
    line-height: 0.4;
  }
`;

const LogOutButton = styled(Button)`
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

const DeleteButton = styled(Button)`
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

const ModifyIcon = styled(CreateRoundedIcon)`
  color: #8c8888;
`;

const ConfirmIcon = styled(CheckRoundedIcon)`
  color: #8c8888;
`;

export default MyPageMain;
