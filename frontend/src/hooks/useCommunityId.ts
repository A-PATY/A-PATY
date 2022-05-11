import { useRecoilValue } from 'recoil';
import { userInfoState } from '../features/Login/atom';

const useCommunityId = () => {
  const userInfo = useRecoilValue(userInfoState);

  return;
};

export default useCommunityId;
