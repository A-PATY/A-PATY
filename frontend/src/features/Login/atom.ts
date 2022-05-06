import { atom } from 'recoil';
import { UserInfo } from '../../types/loginTypes';

export const userInfoState = atom<UserInfo | null>({
  key: 'userInfoState',
  default: null,
});
