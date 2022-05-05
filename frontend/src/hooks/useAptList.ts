import { aptInfo, aptList } from './../types/aptRegisterTypes';
import { useState, useEffect } from 'react';
import AptRegisterService from '../services/AptRegisterService';

const useAptList = () => {
  const [aptList, setAptList] = useState<aptInfo[] | null>();

  useEffect(() => {
    async function fetchAptList() {
      await AptRegisterService.getAptList()
        .then(({ aptList }) => {
          //  console.log(response.aptList);
          setAptList(aptList);
        })
        .catch((error) => {
          //에러처리
        });
    }

    fetchAptList();
  }, []);

  return aptList;
};

export default useAptList;
