import { atom, selector } from 'recoil';
import { UserInfo } from '../../types/loginTypes';

export const userInfoState = atom<UserInfo | null>({
  key: 'userInfoState',
  default: null,
});

export const updatedUser = selector({
  key: 'updatedUser',
  get: ({ get }) => {
    const user = get(userInfoState);
    return user?.userId
  }
});