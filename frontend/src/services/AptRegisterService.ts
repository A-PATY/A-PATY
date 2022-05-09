import { aptListResponse, doroJusoRequest } from '../types/aptRegisterTypes';
import { axiosInstance, dataAxsioInstance } from './../utils/axios';

class AptRegisterService {
  public static async getAptList() {
    const response = await axiosInstance.get<aptListResponse>(
      'api/v1/community/apt',
    );
    return response.data;
  }

  public static async getDoroJusoList(data: doroJusoRequest) {
    const response = await dataAxsioInstance.get('', {
      params: data,
    });
    return response.data;
  }
}

export default AptRegisterService;
