import { getCookie, setCookie } from './../hooks/Cookie';
import axios from 'axios';
import UserService from '../services/UserService';

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
    console.log(error);
    console.log('인터셉터 작동');
    const {
      config,
      response: { status },
    } = error;

    const originalRequest = config;

    if (status === 401 || status === 403) {
      const refreshToken = getCookie('apaty_refresh');

      const accessToken =
        axiosInstance.defaults.headers.common['Authorization'];

      if (accessToken !== null) {
        axiosInstance.defaults.headers.common[
          'RefreshToken'
        ] = `Bearer ${refreshToken}`;

        UserService.getNewToken().then(({ accessToken, refreshToken }) => {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          setCookie('apaty_refresh', refreshToken, {
            expires: new Date(Date.now() + 100 * 60),
          });

          // return axios(originalRequest);
          return axiosInstance(originalRequest);
        });
      }
    }
    return Promise.reject(error);
  },
);
