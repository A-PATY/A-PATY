import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import BoardService from '../../services/BoardService';
// import userInfoState from '../'
import { axiosInstance } from '../../utils/axios';

import Swal from 'sweetalert2';
import { setCookie } from '../../hooks/Cookie';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../features/Login/atom';
import { categoryListState } from '../../features/Board/atom';

import { db } from '../../firebase';
import { ref, set, get, child, onValue, onDisconnect } from 'firebase/database';

const KakaoCallbackMain: React.FC = () => {
  const [open, setOpen] = useState(true);
  const href = window.location.href;
  let params = new URL(href).searchParams;
  let code = params.get('code');
  let navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoState);
  const setCategoryList = useSetRecoilState(categoryListState);

  // 배포 후 삭제
  const href2 = href.split(':');
  useEffect(() => {
    if (code !== null && href2[0] === 'http') {
      UserService.getUserToken(code, true)
        .then(({ accessToken, refreshToken, newMember }) => {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          setCookie('apaty_refresh', refreshToken, {
            //expires: Math.floor(Date.now() / 1000) + (60 * 60) }
            expires: new Date(Date.now() + 100 * 60 * 60),
          });

          if (newMember) {
            navigate('/newMember');
          } else {
            BoardService.getCategoryList().then(({ categoryList }) => {
              console.log('categoryList : ');
              console.log(categoryList);
              setCategoryList(categoryList);
            });
            UserService.getUserInfo().then(({ userInfo }) => {
              setUserInfo(userInfo);

              const connectRef = ref(db, '.info/connected');
              onValue(connectRef, (snapshot) => {
                if (snapshot.val() === true) {
                  // firebase 저장하기
                  set(ref(db, `/status/${userInfo?.userId}`), {
                    state: 'online',
                  });
                }

                onDisconnect(ref(db, `/status/${userInfo?.userId}/state`)).set(
                  'offline',
                ); // offline
              });

              Swal.fire({
                title: '로그인하였습니다.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });

              navigate('/local_community');
            });
          }
        })
        .catch((error) => {
          const { message } = error;
          Swal.fire({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }

    if (code !== null && href2[0] === 'https') {
      UserService.getUserToken(code, false)
        .then(({ accessToken, refreshToken, newMember }) => {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          setCookie('apaty_refresh', refreshToken, {
            //expires: Math.floor(Date.now() / 1000) + (60 * 60) }
            expires: new Date(Date.now() + 100 * 60 * 60),
          });

          if (newMember) {
            navigate('/newMember');
          } else {
            UserService.getUserInfo().then(({ userInfo }) => {
              setUserInfo(userInfo);

              const connectRef = ref(db, '.info/connected');
              onValue(connectRef, (snapshot) => {
                if (snapshot.val() === true) {
                  // firebase 저장하기
                  set(ref(db, `/status/${userInfo?.userId}`), {
                    state: 'online',
                  });
                }

                onDisconnect(ref(db, `/status/${userInfo?.userId}/state`)).set(
                  'offline',
                ); // offline
              });

              Swal.fire({
                title: '로그인하였습니다.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });

              navigate('/local_community');
            });
          }
        })
        .catch((error) => {
          const { message } = error;
          Swal.fire({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  }, []);
  //

  // 배포 후 살리기
  // useEffect(() => {
  //   if (code !== null) {
  //     UserService.getUserToken(code, testMode)
  //       .then(({ accessToken, refreshToken, newMember }) => {
  //         axiosInstance.defaults.headers.common[
  //           'Authorization'
  //         ] = `Bearer ${accessToken}`;

  //         setCookie('apaty_refresh', refreshToken, {
  //           //expires: Math.floor(Date.now() / 1000) + (60 * 60) }
  //           expires: new Date(Date.now() + 100 * 60 * 60),
  //         });

  //         if (newMember) {
  //           navigate('/newMember');
  //         } else {
  //           UserService.getUserInfo().then(({ userInfo }) => {
  //             setUserInfo(userInfo);

  //             const connectRef = ref(db, '.info/connected');
  //             onValue(connectRef, (snapshot) => {
  //               if (snapshot.val() === true) {
  //                 // firebase 저장하기
  //                 set(ref(db, `/status/${userInfo?.userId}`), {
  //                   state: 'online',
  //                 });
  //               }

  //               onDisconnect(ref(db, `/status/${userInfo?.userId}/state`)).set(
  //                 'offline',
  //               ); // offline
  //             });

  //             Swal.fire({
  //               title: '로그인하였습니다.',
  //               icon: 'success',
  //               showConfirmButton: false,
  //               timer: 2000,
  //             });

  //             navigate('/local_community');
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         const { message } = error;
  //         Swal.fire({
  //           title: message,
  //           icon: 'error',
  //           showConfirmButton: false,
  //           timer: 2000,
  //         });
  //       });
  //   }
  // }, []);

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
