import React, { useState } from 'react';
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
import AptRegisterService from '../../services/AptRegisterService';
import Swal from 'sweetalert2';
import { doroJuso } from '../../types/aptRegisterTypes';

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
  const aptList = useAptList();
  const [aptOpen, setAptOpen] = useState<boolean>(false);
  const [doroJusoList, setDoroJusoList] = useState<doroJuso[] | null>(null);

  const handleOpen = () => setAptOpen(true);

  const handleCustomMenuItemClick =
    (aptId: number) =>
    (aptName: string) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setAptId(aptId);
      setAptName(aptName);
      setAptOpen(false);

      AptRegisterService.getDoroJusoList({
        confmKey: `${process.env.REACT_APP_DOROJUSO_KEY}`,
        countPerPage: 10,
        currentPage: 1,
        keyword: `${userInfo?.sidoName}${userInfo?.gugunName}${userInfo?.dongName}${aptName}`,
        resultType: 'json',
      }).then(({ results }) => {
        if (results.common.errorCode !== '0') {
          Swal.fire({
            title: results.common.errorMessage,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          setDoroJusoList(results.juso);
        }
      });
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
        <AptButton variant="contained" onClick={handleOpen}>
          우리 아파트 찾기
        </AptButton>
        <List>
          {doroJusoList !== null &&
            doroJusoList.length !== 0 &&
            doroJusoList.map((doroJuso) => {
              return (
                <ListItem
                  disablePadding
                  key={doroJuso.bdMgtSn}
                  onClick={(event) =>
                    handleListItemClick(doroJuso.roadAddr)(event)
                  }
                >
                  <ListItemButton>
                    <ListItemTextCustom>{doroJuso.roadAddr}</ListItemTextCustom>
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
