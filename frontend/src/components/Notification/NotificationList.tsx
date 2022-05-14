import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { article } from '../../types/boardTypes';
import BoardService from '../../services/BoardService';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../features/Board/atom';
import { category } from '../../types/boardTypes';
import Notification from './Notification';

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<article[]>([]);
  let categoryId = 0;
  
  useRecoilValue<category[] | null>(categoryListState)?.forEach((category)=> {
    if (category.categoryName === "공지") {
      categoryId = category.categoryId;
    }
  });
  
  useEffect(() => {
    // const fetchArticles = async () => {
    //   const { articles } = await BoardService.getArticles(
    //     0,
    //     0,
    //     0,
    //     1,
    //     null,
    //   );
    //   setNotifications(articles);
    //   console.log(articles);
    //   return;
    // };
    // fetchArticles();

    if (categoryId) {
      const fetchArticles = async () => {
        const { articles } = await BoardService.getArticles(
          0,
          0,
          0,
          categoryId,
          null,
        );
        setNotifications(articles);
        return;
      };
      fetchArticles();
    };
  }, []);

  return (
    <>
      <Container style={{ display: "" }}>
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
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  margin: 10px 40px;
  height: calc(100% - 70px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
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
