import { atom } from 'recoil';
import { location } from '../../types/familyTypes';

export const aptLocationState = atom< location | null>({
  key: 'aptLocationState',
  default: null,
});