import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import AdminBillConfirm from '../components/Admin/AdminBillConfirm';
import { userInfoState } from '../features/Login/atom';

const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = '관리자 페이지';
  }, []);

  let navigate = useNavigate();

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
      <AdminBillConfirm />
    </>
  );
};

export default AdminPage;
