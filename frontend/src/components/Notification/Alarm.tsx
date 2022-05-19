import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { firestore } from '../../firebase';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';

interface timestamp {
  seconds: number,
  nanoseconds: number,
};

interface alarmProps {
  detail : {
    content: string,
    time: timestamp,
    nickname: string,
    userId: number
  }
}

const Alarm: React.FC<alarmProps> = ({ detail }) => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoState)!;
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    setTime(detail.time.seconds*1000);
  }, [])

  const calculateTime = (time: number) => {
    const today = new Date();
    const timeValue = new Date(time);
    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }
    return time;
  };

  const goToDetail = () => {
    navigate(`/find_family`);
  };

  const deleteAlarm = () => {
    const notifyRef = doc(firestore, 'notifications', userInfo?.userId.toString());
    const date = new Date(time);
    updateDoc(notifyRef, {
      [date.toString()]: deleteField()
    });
    window.location.href = '/notification';
  };
  
  return (
    <>
      <Container>
        <NotificationIconCustom onClick={goToDetail}/>
        <CloseIconCustom onClick={deleteAlarm}/>
        <Contents onClick={goToDetail}>
          <Title>{detail.nickname}님</Title>
          <Content>{detail.content}</Content>
          <Info>
            <Time>{calculateTime(time)}</Time>
          </Info>
        </Contents>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  /* align-items: center; */
  margin: 35px 0;
  cursor: pointer;
`;

const NotificationIconCustom = styled(LocationOnIcon)`
  /* margin: auto 0; */
  font-size: 28px;
  color: #e4d2ee;
  background-color: #fff;
  border: solid 0.5px #d3d3d3;
  border-radius: 30px;
  padding: 8px;
`;

const CloseIconCustom = styled(CloseIcon)`
  position: absolute;
  right: 0;
  top: -3px;
  font-size: 18px;
  color: gray;
  &:hover {
    color: #222;
  };
  z-index: 1;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  width: 270px;
`;

const Title = styled.h3`
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled.p`
  line-height: 20px;
  font-size: 14px;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  white-space: normal;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 60px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  color: rgba(0, 0, 0, 0.6);
`;

const Time = styled.p`
  font-size: 12px;
  line-height: 14px;
`;

const Icons = styled.div`
  font-size: 8px;
  line-height: 8px;
  display: flex;
  align-items: center;
  & .MuiSvgIcon-root {
    font-size: 12px;
    margin: 0 3px 0 6px;
  };
`;

export default Alarm;
