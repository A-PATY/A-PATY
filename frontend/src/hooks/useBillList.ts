import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { billInfoState } from '../features/Bill/atom';
import AdminService from '../services/AdminService';
import { bill } from '../types/adminTypes';

const useBillList = () => {
  const setBillInfo = useSetRecoilState(billInfoState);

  const [billList, setBillList] = useState<bill[] | null>();

  useEffect(() => {
    async function fetchBillList() {
      await AdminService.getBillList()
        .then(({ bills }) => {
          setBillList(bills);
          setBillInfo(bills);
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
