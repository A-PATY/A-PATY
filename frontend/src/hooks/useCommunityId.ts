import { useRecoilValue } from 'recoil';
import { userInfoState } from '../features/Login/atom';

const useCommunityId = (type: number) => {
  // type - 1:지역, 2:아파트, 3:아파트 익명
  const userInfo = useRecoilValue(userInfoState);
  console.log('userInfo : ');
  console.log(userInfo);
  const communityList = userInfo?.communityList;
  const communityId = communityList?.filter((community) => {
    if (type === 1) {
      return (
        community.communityType === '지역' &&
        community.communityType2 === '전체'
      );
    } else if (type === 2) {
      return (
        community.communityType === '아파트' &&
        community.communityType2 === '전체'
      );
    } else if (type === 3) {
      return (
        community.communityType === '아파트' &&
        community.communityType2 === '익명'
      );
    } else {
      console.log('아무 type에도 해당하지 않음. 매개변수 확인 필요.');
      return false;
    }
  })[0].communityId;

  return communityId;
};

export default useCommunityId;
