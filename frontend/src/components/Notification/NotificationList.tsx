import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { article } from '../../types/boardTypes';
import BoardService from '../../services/BoardService';
import { useRecoilValue } from 'recoil';
// import { categoryListState } from '../../features/Board/atom';
import { category } from '../../types/boardTypes';
import Notification from './Notification';

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<article[]>([]);
  // const categoryId = useRecoilValue<category[] | null>(categoryListState)?.forEach((category)=> {
  //   if (category.categoryName === "공지") {
  //     return category.categoryId;
  //   }
  // });
  
  useEffect(() => {
    const fetchArticles = async () => {
      const { articles } = await BoardService.getArticles(
        0,
        0,
        0,
        1,
        null,
      );
      setNotifications(articles);
      console.log(articles);
      return;
    };
    fetchArticles();

    // if (categoryId) {
    //   const fetchArticles = async () => {
    //     const { articles } = await BoardService.getArticles(
    //       0,
    //       0,
    //       0,
    //       categoryId,
    //       null,
    //     );
    //     setNotifications(articles);
    //     console.log('개수는?')
    //     return;
    //   };
    //   fetchArticles();
    // };
  }, []);

  return (
    <>
      <Container>
        {
          notifications.length === 0 ?
          <Text>등록된 공지가 없습니다.</Text> :
          <>
            {
              notifications.map((notification) => {
                return <Notification detail={notification}/>
              })
            }
          </>
        }
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc((100% - 70px) - 70px);
  text-align: center;
  flex: 1 1 auto;
  overflow-y: auto;
`;

const Text = styled.p`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);;
  font-weight: 600;
`;

export default NotificationList;
