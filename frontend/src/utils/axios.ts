import { getCookie, removeCookie, setCookie } from './../hooks/Cookie';
import axios from 'axios';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const createDataAxsioInstance = () => {
  const dataAxsioInstance = axios.create({
    baseURL: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
    params: {
      confmKey: process.env.REACT_APT_DATA_KEY,
      currentPage: 1,
      countPerPage: 10,
      resultType: 'json',
    },
  });

  return dataAxsioInstance;
};

export const dataAxsioInstance = createDataAxsioInstance();

const createKakaoAxiosInstance = () => {
  const kakaoAxiosInstance = axios.create({
    baseURL: 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
    headers: {
      Authorization: `KakaoAK 9f8212ade1576047ddcf60fd0ab79a2e`,
    },
  });

  return kakaoAxiosInstance;
};

export const kakaoAxiosInstance = createKakaoAxiosInstance();

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 403 || status === 401) {
      const refreshToken = getCookie('apaty_refresh');

      if (refreshToken !== undefined) {
        delete axiosInstance.defaults.headers.common['Authorization'];
        axiosInstance.defaults.headers.common[
          'RefreshToken'
        ] = `Bearer ${refreshToken}`;

        UserService.getNewToken()
          .then(({ accessToken, refreshToken }) => {
            axiosInstance.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${accessToken}`;

            setCookie('apaty_refresh', refreshToken, {
              maxAge: 60 * 60 * 24 * 5,
              path: '/',
            });

            axiosInstance(originalRequest);

            return;
          })
          .catch((error) => {
            if (error.status === 400) {
              //???????????? ?????? ?????? ?????? ???????????? ??????
              Swal.fire({
                title: '????????? ?????? ????????? ?????????????????????.',
                text: '?????? ????????? ???????????? ?????????????????????.',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
            }
            removeCookie('apaty_refresh', { path: '/' });
            window.location.href = '/';
          });
      } else {
        window.location.href = '/';
        //???????????? ?????? ?????? ??????
      }
    }
    return Promise.reject(error);
  },
);
