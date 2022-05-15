import * as React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import {
  categoryListState,
  adminCategoryChipState,
  userCategoryChipState,
} from '../../../features/Board/atom';
import { userInfoState } from '../../../features/Login/atom';
import { category } from '../../../types/boardTypes';

interface Props {
  categoryId: number;
  setCategoryId: (value: number) => void;
}

const CategoryChips: React.FC<Props> = ({ categoryId, setCategoryId }) => {
  const userInfo = useRecoilValue(userInfoState);
  const chipData = [{ categoryId: 0, categoryName: '전체', adminOnly: false }];
  const categoryList = useRecoilValue(categoryListState);

  if (userInfo?.role === 'ROLE_ADMIN') {
    if (categoryList !== null) chipData.push(...categoryList);
  } else if (userInfo?.role === 'ROLE_USER') {
    if (categoryList !== null)
      chipData.push(...categoryList?.filter((category) => !category.adminOnly));
  }

  // selector -> 오류 떠서 보류
  // let chipData: category[] | undefined = [];
  // if (userInfo?.role === 'ROLE_ADMIN') {
  //   chipData = useRecoilValue(adminCategoryChipState)
  // } else if (userInfo?.role === 'ROLE_USER') {
  //   if (categoryList !== null)
  //     chipData.push(...categoryList?.filter((category) => !category.adminOnly));
  // }

  // if (userInfo?.role === 'ROLE_USER') {
  //   categoryList?.forEach((category) => {
  //     if (!category.adminOnly) {
  //       entireCategory.push(category);
  //     }
  //   });
  // }

  const handleCategoryClick = (categoryId: number) => {
    console.log('categoryId');
    console.log(categoryId);
    setCategoryId(categoryId);
  };

  return (
    <PaperCustom
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'nowrap',
        listStyle: 'none',
        padding: 0.5,
        margin: 0,
        overflow: 'auto',
      }}
    >
      {chipData?.map((data) => {
        return (
          <ListItem
            key={data.categoryId}
            onClick={() => handleCategoryClick(data.categoryId)}
          >
            <Chip
              label={data.categoryName}
              style={
                data.categoryId === categoryId
                  ? {
                      background: '#e4d2ee',
                      fontWeight: 'bold',
                      // boxShadow: '2px 2px 5px 1px grey',
                    }
                  : {}
              }
            />
          </ListItem>
        );
      })}
    </PaperCustom>
  );
};

const PaperCustom = styled(Paper)`
  margin-top: 5px;
  margin-bottom: 5px;
  -ms-overflow-style: none;
  background-color: transparent;
  border: none;
  box-shadow: none;
  &::-webkit-scrollbar {
    display: none;
  }
  &.box {
    -ms-overflow-style: none;
  }
  &.box::-webkit-scrollbar {
    display: none;
  }
`;

const ListItem = styled.li`
  margin: 3px;
  cursor: pointer;
`;

export default CategoryChips;
