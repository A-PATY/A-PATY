import { atom } from 'recoil';
import { category } from '../../types/boardTypes';

export const categoryListState = atom<category[] | null>({
  key: 'categoryListState',
  default: null,
});
