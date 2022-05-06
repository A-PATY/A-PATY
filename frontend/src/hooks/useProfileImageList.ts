import { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { profileImgList } from '../types/loginTypes';

const useProfileImageList = () => {
  const [profileImageList, setProfileImageList] = useState<profileImgList>();

  useEffect(() => {
    async function fetchProfileImageList() {
      const profileImageList = await UserService.getProfileImageList();

      setProfileImageList(profileImageList);
    }

    fetchProfileImageList();
  }, []);

  return profileImageList?.profileImgList;
};

export default useProfileImageList;
