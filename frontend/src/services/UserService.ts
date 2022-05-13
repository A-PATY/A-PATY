import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../features/Login/atom';
import { aptRegisterResponse } from '../types/aptRegisterTypes';
import {
  IssueTokenResponse,
  LogInResponse,
  LoginResponse,
  modifyUserInfoRequest,
  profileImgList,
  signUpRequest,
  xy,
} from '../types/loginTypes';
import { axiosInstance, kakaoAxiosInstance } from './../utils/axios';

class UserService {
  //  배포 후 살리기
  // public static async getUserToken(accessCode: string) {
  //   const response = await axiosInstance.post<LoginResponse>(
  //     'api/v1/auth/users/log-in',
  //     {
  //       accessCode: accessCode,
  //     },
  //   );

  //   return response.data;
  // }
  //

  //배포 후 삭제
  public static async getUserToken(accessCode: string, testMode: boolean) {
    const response = await axiosInstance.post<LoginResponse>(
      'api/v1/auth/users/log-in',
      {
        accessCode: accessCode,
        testMode: testMode,
      },
    );

    return response.data;
  }
  //
  public static async getNewToken() {
    const response = await axiosInstance.get<IssueTokenResponse>(
      '/api/v1/auth/users/issue-token',
    );

    return response.data;
  }

  public static async getProfileImageList() {
    const response = await axiosInstance.get<profileImgList>(
      '/api/v1/profile-img',
    );

    return response.data;
  }

  public static async getUserAddress(data: xy) {
    const response = await kakaoAxiosInstance.get('', {
      params: data,
    });

    return response.data;
  }

  public static async signUpRequest(data: signUpRequest) {
    const response = await axiosInstance.post<aptRegisterResponse>(
      '/api/v1/auth/users/sign-up',
      data,
    );

    return response.data;
  }

  public static async getUserInfo() {
    const response = await axiosInstance.get<LogInResponse>(
      '/api/v1/auth/users/user-info',
    );
    return response.data;
  }

  public static async modifyUserInfo(data: modifyUserInfoRequest) {
    const response = await axiosInstance.put<aptRegisterResponse>(
      `api/v1/users/${data.profileInfo}`,
      data.data,
    );

    return response.data;
  }

  public static async deleteUser() {
    const response = await axiosInstance.delete<aptRegisterResponse>(
      `api/v1/users`,
    );

    return response.data;
  }

  public static async logOutUser() {
    const response = await axiosInstance.get<aptRegisterResponse>(
      `api/v1/auth/users/log-out`,
    );

    return response.data;
  }
}

export default UserService;
