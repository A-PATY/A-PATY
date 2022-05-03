import { getCookie } from './../hooks/Cookie';
import axios from 'axios';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCALHOST_URL,
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

    if (status === 401) {
      const refreshToken = getCookie('apaty_refresh');
      axios({
        method: 'post',
        url: `${baseURL}/api/auth/refresh`,
        data: { refreshToken },
      }).then((response) => {
        const accessTokens = response.data.data.accessToken;
        const accessToken = `${accessTokens.header}.${accessTokens.payload}.${accessTokens.signature}`;

        sessionStorage.setItem('access-token', accessToken);

        originalRequest.headers = { 'X-AUTH-TOKEN': accessToken };
        return axios(originalRequest);
      });
    }
    return Promise.reject(error);
  },
);
