import { aptListResponse } from '../types/aptRegisterTypes';
import { axiosInstance } from './../utils/axios';

class AptRegisterService {
  public static async getAptList() {
    const response = await axiosInstance.get<aptListResponse>(
      'api/v1/community/apt',
    );
    return response.data;
  }
}

export default AptRegisterService;
