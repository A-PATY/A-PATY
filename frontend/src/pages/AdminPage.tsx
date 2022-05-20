import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import AdminBillConfirm from '../components/Admin/AdminBillConfirm';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import { userInfoState } from '../features/Login/atom';

const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = '관리자 페이지';
  }, []);

  const userInfo = useRecoilValue(userInfoState);

  if (userInfo?.role === 'ROLE_USER') {
    Swal.fire({
      title: '접근권한이 없습니다.',
      text: '메인페이지로 돌아갑니다.',
      icon: 'info',
      showConfirmButton: false,
      timer: 2000,
    });
    window.location.href = '/';
  }
  return (
    <>
      <Container>
        <Header header="고지서 관리" />
        <AdminBillConfirm />
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
export default AdminPage;
