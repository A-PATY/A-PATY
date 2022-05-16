import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Swal from 'sweetalert2';

import { bill } from '../../types/adminTypes';

import useBillList from '../../hooks/useBillList';

import AdminService from '../../services/AdminService';
import { billInfoState } from '../../features/Bill/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const AdminBillConfirm: React.FC = () => {
  useBillList();
  const billList = useRecoilValue(billInfoState);
  const setBillInfo = useSetRecoilState(billInfoState);

  const handleListItemClick =
    (bilImage: string) =>
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      const bilImageName = bilImage.split('.')[4].split('/')[2].split('_');
      Swal.fire({
        title: '',
        text: `${bilImage.split('.')[4].split('/')[2].split('_')}`,
        imageUrl: bilImage,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showDenyButton: true,
        confirmButtonText: '승인',
        denyButtonText: '반려',
      }).then((result) => {
        if (result.isConfirmed) {
          AdminService.approveBill({
            kakaoId: bilImageName[0],
            aptId: bilImageName[1],
            dong: bilImageName[3],
            ho: bilImageName[4],
            doroJuso: bilImageName[5],
            billImg: bilImage,
          }).finally(() => {
            AdminService.getBillList().then(({ bills }) => {
              setBillInfo(bills);
            });
          });
        } else if (result.isDenied) {
          AdminService.rejectBill({
            billImg: bilImage,
            kakaoId: bilImageName[0],
          }).finally(() => {
            AdminService.getBillList().then(({ bills }) => {
              // setBillList(bills);
            });
          });
        }
      });
    };

  return (
    <>
      <FirstSection>
        <InfoContainer>
          <Phrase>고지서 리스트</Phrase>
        </InfoContainer>
        <ListCustom>
          {billList !== undefined &&
            billList !== null &&
            billList.length !== 0 &&
            billList.map((bill) => {
              return (
                <ListItem
                  disablePadding
                  key={bill.billId}
                  onClick={(event) => handleListItemClick(bill.billImg)(event)}
                >
                  <ListItemButton>
                    <ListItemTextCustom>
                      {bill.billImg.split('.')[4].split('/')[2]}
                    </ListItemTextCustom>
                  </ListItemButton>
                </ListItem>
              );
            })}
        </ListCustom>
      </FirstSection>
    </>
  );
};

const FirstSection = styled.section`
  background: #fffdfb;
  display: flex;
  flex-direction: column;
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

const ListCustom = styled(List)`
  width: 100%;
`;

const ListItemTextCustom = styled(ListItemText)`
  & .MuiTypography-root {
    font-family: 'MinSans-Regular';
    font-size: 14px;
  }
`;

export default AdminBillConfirm;
