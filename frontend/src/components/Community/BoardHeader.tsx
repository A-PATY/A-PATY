/** @jsxImportSource @emotion/react */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { useNavigate } from 'react-router-dom';
import { InputBase } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { firestore } from '../../firebase';
import { getDoc, updateDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userInfoState, updatedUser } from '../../features/Login/atom';
import { UserInfo } from '../../types/loginTypes';
import Badge from '@mui/material/Badge';

interface Props {
  type: number;
  communityId: number | undefined;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const BoardHeader: React.FC<Props> = ({
  type,
  communityId,
  keyword,
  setKeyword,
}) => {
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState)!;
  const userId = useRecoilValue(updatedUser);
  const navigate = useNavigate();
  const writeArticle = () => {
    navigate('/board/write', {
      state: { type: type, communityId: communityId },
    });
  };
  const [searchValue, setSearchValue] = useState(keyword);
  const goToAnony = () => {
    navigate('/apt_community/anonymous');
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };
  const onSearch = () => {
    setKeyword(searchValue);
  };

  const goToNotification = () => {
    navigate('/notification');
  };

  // 알림기능 추가 ---------------------
  const [notifications, setNotifications] = useState<any>({});

  useEffect(() => {
    if (userId) {
      const notifyRef = doc(
        firestore,
        `notifications`,
        userInfo?.userId.toString(),
      );
      onSnapshot(notifyRef, (document) => {
        // console.log('firestore 알림 존재?',document.exists())
        if (document.exists()) {
          const alarm = document.data();
          // console.log("알림은? ", alarm)
          // console.log('firestore의 알림!!', alarm);
          setNotifications(alarm);
          // console.log(notifications);
        }
      });
    }
  }, [userId]);

  return (
    <>
      <Container>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <Search id="search">
              <InputBaseCustom
                placeholder="검색하기"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValue}
                onChange={handleSearchChange}
                onKeyPress={handleKeyUp}
                sx={{ fontFamily: 'MinSans-Regular' }}
              />
            </Search>
          </Grid>
          <GridCustom item xs={3.5}>
            <TransparentBtn onClick={onSearch}>
              <SearchRoundedIcon sx={{ color: '#8c8888' }} />
            </TransparentBtn>
            <TransparentBtn onClick={writeArticle} className="write">
              글쓰기
              {/* <CreateRoundedIconCustom /> */}
            </TransparentBtn>
          </GridCustom>
        </Grid>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: white;
  font-size: 18px;
  height: 70px;
  text-align: center;
  position: sticky;
  top: 0px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
`;

const GridText = styled(Grid)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridCustom = styled(Grid)`
  display: flex;
  /* justify-content: space-evenly; */
  align-items: center;

  &:last-child {
    margin-right: 5px;
  }
`;
const Text = styled.p``;

const TransparentBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  @media (max-width: 330px) {
    & .MuiSvgIcon-root {
      font-size: 20px;
      color: #8c8888;
    }
  }

  //삭제
  &.write {
    border-radius: 10px;
    background-color: #e4d2ee;
    width: auto;
    height: 35px;
    font-size: 12px;
    font-family: 'MinSans-Regular';
    color: #000;

    &:hover {
      background-color: #bd79e2;
      color: #fff;
    }
  }
`;

const InputBaseCustom = styled(InputBase)`
  width: 100%;
  padding: 3px 15px;
  font-size: 14px;
`;

const Search = styled.div`
  position: relative;
  border-radius: 10px;
  margin: 0px 8px 0px 18px;
  background-color: rgba(192, 192, 192, 0.2);
  &:hover {
    background-color: rgba(192, 192, 192, 0.3);
  }
`;

const CreateRoundedIconCustom = styled(CreateRoundedIcon)`
  color: #b65ee6;
  &:hover {
    color: #e4d2ee;
  }
`;

export default BoardHeader;
