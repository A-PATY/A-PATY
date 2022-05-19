import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { article } from '../../types/boardTypes';
import BoardService from '../../services/BoardService';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../features/Board/atom';
import { category } from '../../types/boardTypes';
import Notification from './Notification';
import Alarm from './Alarm';

import { db, firestore } from '../../firebase';
import { ref, set, onValue, onDisconnect } from 'firebase/database';
import { getDoc, updateDoc, doc, onSnapshot, setDoc, Timestamp } from 'firebase/firestore';
import { familyList, location } from '../../types/familyTypes';
import { userInfoState, updatedUser } from '../../features/Login/atom';

interface timestamp {
  seconds: number,
  nanoseconds: number,
};

interface alarm {
  content: string,
  time: timestamp,
  nickname: string,
  userId: number,
}

const NotificationList: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState)!;
  const userId = useRecoilValue(updatedUser)!;
  const [notifications, setNotifications] = useState<article[]>([]);
  const [alarms, setAlarms] = useState<alarm[]>([]);;  
  const [tab, setTab] = useState<string>("알림");
  let categoryId = 0;
  
  useRecoilValue<category[] | null>(categoryListState)?.forEach((category)=> {
    if (category.categoryName === "공지") {
      categoryId = category.categoryId;
    }
  });
  
  // 공지사항 불러오기 
  useEffect(() => {
    const fetchArticles = async () => {
      const { articles } = await BoardService.getArticles(
        0,
        0,
        0,
        categoryId,
        null,
      );
      
      articles.sort((a, b) => {
        return +new Date(b.createdAt) - +new Date(a.createdAt);
      });
      setNotifications(articles);
    };

    fetchArticles();
  }, [categoryId]);

  // firestore 알림 불러오기
  useEffect(() => {
    if (userId) {
      const notifyRef = doc(firestore, `notifications`, userId?.toString());
      
      getDoc(notifyRef).then((res) => {
        if (res.exists()){
          const alarmList = Object.values(res.data());
          
          alarmList.sort((a, b) => {
            return b.time.seconds - a.time.seconds;
          });
          setAlarms(alarmList);
        }
      });
    }
  }, [userId])

  const changeTab = (tab: string) => {
    setTab(tab);
  };

  return (
    <>
      <Tab>
        <Title 
          style={{ 
            borderBottom: tab === "알림" ? "solid 2px black" : "" , 
            color: tab === "알림" ? "black" : "" 
          }} 
          onClick={() => changeTab('알림')}
        >
          알림
        </Title>
        <Title 
          style={{ 
            borderBottom: tab === "공지" ? "solid 2px black" : "",
            color: tab === "공지" ? "black" : ""
          }} 
          onClick={() => changeTab('공지')}
        >
          공지
        </Title>
      </Tab>
      <Container>
        {
          tab === "알림" ? 
          <>
            {
              alarms.length === 0 ?
              <Text>등록된 알림이 없습니다.</Text> :
              <>
                {  // 같은 notification 컴포넌트 사용하고 title={tab}으로 넘겨서 하는 방식으로 진행 가능
                  alarms.map((alarm, index) => {
                    return <Alarm key={index} detail={alarm}/>
                  })
                }
              </>
            }
          </> :
          <>
            {
              notifications.length === 0 ?
              <Text>등록된 공지가 없습니다.</Text> :
              <>
                {
                  notifications.map((notification) => {
                    return <Notification key={notification.articleId} detail={notification}/>
                  })
                }
              </>
            }
          </>
        }
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  padding: 10px 40px;
  height: calc(100% - 70px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* border-bottom: 1px solid lightgray; */
  /* padding: 10px 0 5px; */
`;

const Title = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);;
  font-weight: 600;
  text-align: center;
  padding: 30px 0 20px;
  width: 50%;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);;
  font-weight: 600;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default NotificationList;
