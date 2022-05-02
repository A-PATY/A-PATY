import { LoginResponse } from '../types/loginTypes';
import { axiosInstance } from './../utils/axios';

class UserService {
  public static async getUserToken(accessCode: string) {
    const response = await axiosInstance.post<LoginResponse>(
      'api/v1/auth/users/log-in',
      accessCode,
    );

    return response.data;
  }
}

export default UserService;
