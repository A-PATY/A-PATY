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
              maxAge: 60 * 5,
              path: '/',
            });

            axiosInstance(originalRequest);

            return;
          })
          .catch((error) => {
            if (error.status === 400) {
              //리프레시 토큰 만료 강제 로그아웃 처리
              Swal.fire({
                title: '서비스 이용 시간이 만료되었습니다.',
                text: '계속 이용을 원하시면 로그인해주세요.',
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
        //리프레시 토큰 없는 경우
      }
    }
    return Promise.reject(error);
  },
);
