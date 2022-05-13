import { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import { bill } from '../types/adminTypes';

const useBillList = () => {
  const [billList, setBillList] = useState<bill[] | null>();

  useEffect(() => {
    async function fetchBillList() {
      await AdminService.getBillList()
        .then(({ bills }) => {
          setBillList(bills);
        })
        .catch((error) => {
          //에러처리
        });
    }

    fetchBillList();
  }, []);

  return billList;
};

export default useBillList;
