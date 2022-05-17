import { atom, selector } from 'recoil';
import { category, article } from '../../types/boardTypes';

export const categoryListState = atom<category[] | null>({
  key: 'categoryListState',
  default: null,
});

const chipData = [{ categoryId: 0, categoryName: '전체', adminOnly: false }];

export const adminCategoryChipState = selector({
  key: 'adminCategoryChipState',
  get: ({ get }) => {
    const categoryList = get(categoryListState);
    if (categoryList !== null) {
      const adminCategoryChip = [...chipData, ...categoryList];
      return adminCategoryChip;
    }
  },
});

export const userCategoryChipState = selector({
  key: 'userCategoryChipState',
  get: ({ get }) => {
    const categoryList = get(categoryListState);
    if (categoryList !== null) {
      const userCategoryChip = [
        ...chipData,
        ...categoryList?.filter((category) => !category.adminOnly),
      ];
      return userCategoryChip;
    }
  },
});

export const presentArticleState = atom<article | null>({
  key: 'presentArticleState',
  default: null,
});

export const presentCommunityTypeState = atom<number | null>({
  key: 'presentCommunityTypeState',
  default: null,
});
