import { useEffect } from 'react';
import AdminBillConfirm from '../components/Admin/AdminBillConfirm';

const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = '관리자 페이지';
  }, []);
  return (
    <>
      <AdminBillConfirm></AdminBillConfirm>
    </>
  );
};

export default AdminPage;
