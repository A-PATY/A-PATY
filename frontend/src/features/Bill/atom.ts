import { atom } from 'recoil';
import { bill } from '../../types/adminTypes';

export const billInfoState = atom<bill[] | null>({
  key: 'billInfoState',
  default: null,
});
