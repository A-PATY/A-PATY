import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { axiosInstance } from '../../utils/axios';

const SignUpMain: React.FC = () => {
  const [open, setOpen] = useState(true);
  const href = window.location.href;
  let params = new URL(href).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();

  useEffect(() => {
    if (code !== null) {
      UserService.getUserToken(code)
        .then(({ accessToken, refreshToken, newMember }) => {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          if (newMember) {
            navigate('/new');
          } else {
            alert('로그인하였습니다.');
            navigate('/local_community');
          }
        })
        .catch((error) => {
          const { message } = error;
          alert(message);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default SignUpMain;
