import { axiosInstance } from './../utils/axios';

class FamilyService {
  public static async getFamilyList() {
    const response = await axiosInstance.get(
      'api/v1/family-list',
    );

    return response.data;
  }
}

export default FamilyService;
