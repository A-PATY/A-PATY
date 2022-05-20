import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useAptList from '../../hooks/useAptList';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Swal from 'sweetalert2';
import {
  aptInfo,
  doroJuso,
  kakaoMapSearchKeywordResponse,
} from '../../types/aptRegisterTypes';
import AptRegisterService from '../../services/AptRegisterService';

interface Props {
  setAptId: (aptId: number) => void;
  setAptName: (aptName: string) => void;
  setDoroJuso: (aptName: string) => void;
}

const AptRegister: React.FC<Props> = ({
  setAptId,
  setAptName,
  setDoroJuso,
}) => {
  const userInfo = useRecoilValue(userInfoState);
  const [aptList, setAptList] = useState<aptInfo[] | null>();
  const [aptOpen, setAptOpen] = useState<boolean>(false);
  const [doroJusoList, setDoroJusoList] = useState<doroJuso[] | null>(null);
  const [searchAptName, setSearchAptName] = useState<string>('');
  const handleOpen = () => setAptOpen(true);
  const kakao = (window as any).kakao;
  const ps = new kakao.maps.services.Places();

  const [billStatus, setBillStatus] = useState<string>('');
  const [aptButtonDisabled, setAptButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo !== null) {
      if (userInfo.billStatus === '미제출') {
        setAptButtonDisabled(false);
        setBillStatus('우리 아파트 찾기');
      }

      if (userInfo.billStatus === '승인 대기중') {
        setAptButtonDisabled(true);
        setBillStatus('고지서 인증 승인 대기중입니다.');
      }

      if (userInfo.billStatus === '반려') {
        setAptButtonDisabled(false);
        setBillStatus('우리 아파트 찾기');
        Swal.fire({
          title: '고지서 인증이 반려되었습니다.',
          text: '유효한 정보로 고지서 인증을 해주세요.',
          icon: 'info',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  }, [userInfo]);

  useEffect(() => {
    AptRegisterService.getAptList()
      .then(({ aptList }) => {
        setAptList(aptList);
      })
      .catch((error) => {});
  }, [userInfo]);

  useEffect(() => {
    if (searchAptName !== '') {
      searchPlaces(searchAptName);
    }
  }, [searchAptName]);

  const searchPlaces = (keyword: string) => {
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      Swal.fire({
        title: '아파트를 찾을 수 없습니다.',
        text: '아파티 개발자에게 문의주세요.',
        icon: 'info',
        showConfirmButton: false,
        timer: 2000,
      });
      return false;
    }

    ps.keywordSearch(keyword, placesSearchCB);
  };

  const placesSearchCB = (
    data: kakaoMapSearchKeywordResponse[],
    status: string,
    pagination: number,
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      let dataList: doroJuso[] = [];
      data.forEach((one) => {
        if (one.category_name === '부동산 > 주거시설 > 아파트') {
          dataList.push({
            id: one.id,
            road_address_name: one.road_address_name,
            name: one.place_name,
          });
        }
      });
      setDoroJusoList(dataList);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      Swal.fire({
        title: '사용자 정보 주소 기반 아파트가 없습니다.',
        text: `'내 정보' 에서 주소를 변경해주세요.`,
        icon: 'info',
        showConfirmButton: false,
        timer: 2000,
      });

      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      Swal.fire({
        title: '검색 결과 중 오류가 발생했습니다.',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  };

  const handleCustomMenuItemClick =
    (aptId: number) =>
    (aptName: string) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setAptId(aptId);
      setAptName(aptName);
      setAptOpen(false);
      setSearchAptName(aptName);
    };

  const handleListItemClick =
    (doroJuso: string) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setDoroJuso(doroJuso);
    };

  return (
    <>
      <FirstSection>
        <InfoContainer>
          <Phrase>아파트 커뮤니티에 가입하면,</Phrase>
          <Phrase>더 유용한 정보를 주민끼리 공유할 수 있어요.</Phrase>
          <Phrase>우리 아파트를 찾아 가입해보세요!</Phrase>
        </InfoContainer>
        <AptButton
          disabled={aptButtonDisabled}
          variant="contained"
          onClick={handleOpen}
        >
          {billStatus}
        </AptButton>
        <List style={{ maxHeight: '100%', overflow: 'auto' }}>
          {doroJusoList !== null &&
            doroJusoList.length !== 0 &&
            doroJusoList.map((doroJuso) => {
              return (
                <ListItem
                  disablePadding
                  key={doroJuso.id}
                  onClick={(event) =>
                    handleListItemClick(doroJuso.road_address_name)(event)
                  }
                >
                  <ListItemButton>
                    <ListItemTextCustom>
                      {doroJuso.road_address_name + ' ' + doroJuso.name}
                    </ListItemTextCustom>
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </FirstSection>
      <Modal
        open={aptOpen}
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        onClose={handleCustomMenuItemClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomBox>
          <MenuList>
            {aptList?.map((apt) => {
              return (
                <CustomMenuItem
                  onClick={(event) =>
                    handleCustomMenuItemClick(apt.aptId)(apt.aptName)(event)
                  }
                  key={apt.aptId}
                >
                  {apt.aptName}
                </CustomMenuItem>
              );
            })}
          </MenuList>
        </CustomBox>
      </Modal>
    </>
  );
};

const CustomBox = styled(Box)`
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: rgb(255, 255, 255);
  color: rgb(140, 136, 136);
  border-radius: 4px;
  padding: 4px;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 5px -3px,
    rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px;
  max-width: calc(100% - 32px);
  max-height: calc(100% - 32px);
  font-size: 1rem;
`;

const CustomMenuItem = styled(MenuItem)`
  font-family: 'MinSans-Regular';
  height: 40px;
`;

const FirstSection = styled.section`
  background: #fffdfb;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  height: calc((100% - 70px) - 70px);
  overflow-y: auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 40px;
`;

const Phrase = styled.p`
  box-sizing: border-box;
  margin: 2px;
  padding: 0;
  text-align: center;
  line-height: 130%;
  color: rgb(140, 136, 136);
`;

const AptButton = styled(Button)`
  font-family: 'MinSans-Regular';
  cursor: pointer;
  font-weight: 500;
  min-width: 64px;
  padding: 8px 22px;
  border-radius: 4px;
  background-color: #bae6e5;
  box-shadow: none;
  color: white;
  margin: 10px 30px 30px;

  &:hover {
    text-decoration: none;
    background-color: #95c1c1;
    box-shadow: none;
  }
`;

const ListItemTextCustom = styled(ListItemText)`
  & .MuiTypography-root {
    font-family: 'MinSans-Regular';
    font-size: 14px;
  }
`;
export default AptRegister;
