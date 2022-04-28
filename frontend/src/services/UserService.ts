import { axiosInstance } from './../utils/axios';

interface LoginResponse {
  status: number | null;
  success: boolean;
  message: string;
}

class UserService {
  public static async getUserKakaoToken(accessCode: string) {
    const response = await axiosInstance.post<LoginResponse>(
      'api/v1/auth/users/log-in',
      accessCode,
    );

    return response.data;
  }
}

export default UserService;
