import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { articles, article } from '../../types/boardTypes';
import BoardService from '../../services/BoardService';
import { useRecoilValue } from 'recoil';
// import { categoryListState } from '../../features/Board/atom';
import { category } from '../../types/boardTypes';

interface Props {
  detail : article,
}

const Notification: React.FC<Props> = ({ detail }) => {
  const goToDetail = () => {
    console.log('click')
  }
  return (
    <>
      <Container onClick={goToDetail}>
        <Box>
          <Avatar src="admin"/>
          <Wrapper>
            <Title>{detail.title}</Title>
            <Content>{detail.contents}</Content>
            <Time>{detail.createdAt}</Time>
          </Wrapper>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  text-align: left;
  margin: 5px 0;
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Title = styled.h3`
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.h3`
  margin-top: 5px;
  line-height: 20px;
  font-size: 14px;
`;

const Time = styled.p`
  font-size: 12px;
  color: lightgray;
  margin-top: 5px;
`;

export default Notification;
