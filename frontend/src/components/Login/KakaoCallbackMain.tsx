import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
// import userInfoState from '../'
import { axiosInstance } from '../../utils/axios';

import Swal from 'sweetalert2';
import { setCookie } from '../../hooks/Cookie';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../features/Login/atom';

const KakaoCallbackMain: React.FC = () => {
  const [open, setOpen] = useState(true);
  const href = window.location.href;
  let params = new URL(href).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    if (code !== null) {
      UserService.getUserToken(code)
        .then(({ accessToken, refreshToken, newMember }) => {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          axiosInstance.defaults.headers.common[
            'RefreshToken'
          ] = `Bearer ${accessToken}`;

          setCookie('apaty_refresh', refreshToken, {
            expires: new Date(Date.now() + 100 * 60),
          });

          if (newMember) {
            navigate('/newMember');
          } else {
            UserService.getUserInfo().then(({ userInfo }) => {
              setUserInfo(userInfo);
            });
            Swal.fire({
              title: '로그인하였습니다.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000,
            });
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default KakaoCallbackMain;
