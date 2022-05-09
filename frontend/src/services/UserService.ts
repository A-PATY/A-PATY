import {
  IssueTokenResponse,
  LogInResponse,
  LoginResponse,
  profileImgList,
  signUpRequest,
  xy,
} from '../types/loginTypes';
import { axiosInstance, kakaoAxiosInstance } from './../utils/axios';

class UserService {
  public static async getUserToken(accessCode: string) {
    const response = await axiosInstance.post<LoginResponse>(
      'api/v1/auth/users/log-in',
      accessCode,
    );

    return response.data;
  }

  public static async getNewToken() {
    const response = await axiosInstance.post<IssueTokenResponse>(
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
    const response = await axiosInstance.post<profileImgList>(
      '/api/v1/auth/users/sign-up',
    );

    return response.data;
  }

  public static async getUserInfo() {
    const response = await axiosInstance.get<LogInResponse>(
      '/api/v1/auth/users/user-info',
    );

    return response.data;
  }
}

export default UserService;
