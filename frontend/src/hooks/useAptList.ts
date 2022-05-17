import { aptInfo, aptList } from './../types/aptRegisterTypes';
import { useState, useEffect } from 'react';
import AptRegisterService from '../services/AptRegisterService';

const useAptList = () => {
  const [aptList, setAptList] = useState<aptInfo[] | null>();

  useEffect(() => {
    async function fetchAptList() {
      await AptRegisterService.getAptList()
        .then(({ aptList }) => {
          console.log('아파트으');
          setAptList(aptList);
        })
        .catch((error) => {
          //에러처리
          console.log('에러');
        });
    }

    fetchAptList();
  }, []);

  return aptList;
};

export default useAptList;
