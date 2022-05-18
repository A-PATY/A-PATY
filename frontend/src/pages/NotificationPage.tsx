import styled from '@emotion/styled';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NotificationList from '../components/Notification/NotificationList';
import { getCookie } from '../hooks/Cookie';

const NotificationPage: React.FC = () => {
  useEffect(() => {
    document.title = '알림';
  }, []);

  const refreshToken = getCookie('apaty_refresh');

  useEffect(() => {
    if (refreshToken === undefined) {
      Swal.fire({
        title: '로그인 후 서비스 이용해주세요.',
        icon: 'success',
        showConfirmButton: false,
        timer: 4000,
      });
      window.location.replace('/');
    }
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
