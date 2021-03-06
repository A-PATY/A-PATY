import {
  aptListResponse,
  aptRegisterResponse,
} from '../types/aptRegisterTypes';
import { axiosInstance, dataAxsioInstance } from './../utils/axios';

class AptRegisterService {
  public static async getAptList() {
    const response = await axiosInstance.get<aptListResponse>(
      '/api/v1/community/apt',
    );
    return response.data;
  }

  public static async aptRegisterRequest(data: FormData) {
    const response = await axiosInstance.post<aptRegisterResponse>(
      '/api/v1/community/apt',
      data,
    );
    return response.data;
  }
}

export default AptRegisterService;
