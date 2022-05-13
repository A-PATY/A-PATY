import {
  approveBillRequest,
  billList,
  rejectBillRequest,
} from '../types/adminTypes';
import { aptRegisterResponse } from '../types/aptRegisterTypes';
import { axiosInstance } from '../utils/axios';

class AdminService {
  public static async getBillList() {
    const response = await axiosInstance.get<billList>('/api/v1/admin/bill');
    return response.data;
  }

  public static async approveBill(data: approveBillRequest) {
    const response = await axiosInstance.post<aptRegisterResponse>(
      '/api/v1/admin/bill',
      data,
    );
    return response.data;
  }

  public static async rejectBill(data: rejectBillRequest) {
    const response = await axiosInstance.delete<aptRegisterResponse>(
      '/api/v1/admin/bill',
      {
        data,
        withCredentials: true,
      },
    );
    return response.data;
  }
}

export default AdminService;
