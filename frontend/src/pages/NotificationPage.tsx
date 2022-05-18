import styled from '@emotion/styled';
import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NotificationList from '../components/Notification/NotificationList';

const NotificationPage: React.FC = () => {
  useEffect(() => {
    document.title = '알림';
  }, []);

  return (
    <>
      <Container>
        <Header header="" />
        <NotificationList />
      </Container>
      <Footer footerNumber={-1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default NotificationPage;
