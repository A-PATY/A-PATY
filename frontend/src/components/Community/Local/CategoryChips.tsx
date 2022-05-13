import * as React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../../features/Board/atom';
import { userInfoState } from '../../../features/Login/atom';

interface ChipData {
  key: number;
  label: string;
}

interface Props {
  categoryId: number;

  setCategoryId: (value: number) => void;
}

const CategoryChips: React.FC<Props> = ({ categoryId, setCategoryId }) => {
  // const [chipData, setChipData] = React.useState<readonly ChipData[]>([
  //   { key: 0, label: '전체' },
  //   { key: 1, label: '일상' },
  //   { key: 2, label: '정보' },
  //   { key: 3, label: '나눔장터' },
  //   { key: 4, label: '헬프' },
  //   { key: 5, label: '육아' },
  //   { key: 6, label: '공구' },
  //   { key: 7, label: '후기' },
  // ]);

  // 0: {categoryId: 1, categoryName: '공지', adminOnly: true}
  // 1: {categoryId: 2, categoryName: '일상', adminOnly: false}
  // 2: {categoryId: 3, categoryName: '정보', adminOnly: false}
  // 3: {categoryId: 4, categoryName: '나눔장터', adminOnly: false}
  // 4: {categoryId: 5, categoryName: '헬프', adminOnly: false}
  // 5: {categoryId: 6, categoryName: '육아', adminOnly: false}
  // 6: {categoryId: 7, categoryName: '교육', adminOnly: false}
  // 7: {categoryId: 8, categoryName: '공구', adminOnly: false}
  // 8: {categoryId: 9, categoryName: '후기', adminOnly: false}
  // length: 9

  const userInfo = useRecoilValue(userInfoState);

  const chipData = [{ categoryId: 0, categoryName: '전체', adminOnly: false }];

  const categoryList = useRecoilValue(categoryListState);

  if (userInfo?.role === 'ROLE_ADMIN') {
    if (categoryList !== null) chipData.push(...categoryList);
  } else if (userInfo?.role === 'ROLE_USER') {
    if (categoryList !== null)
      chipData.push(...categoryList?.filter((category) => !category.adminOnly));
  }

  // filter
  // if (userInfo?.role === 'ROLE_USER') {
  //   if (categoryList?.filter((category) => !category.adminOnly) !== undefined) {
  //     categoryList = categoryList?.filter((category) => !category.adminOnly);
  //   }
  // }

  // if (userInfo?.role === 'ROLE_USER') {
  //   categoryList?.forEach((category) => {
  //     if (!category.adminOnly) {
  //       entireCategory.push(category);
  //     }
  //   });
  // }

  console.log('chipData :');
  console.log(chipData);

  // console.log('entireCategory :');
  // console.log(entireCategory);

  // const chipData = useRecoilValue(categoryListState)?.filter(
  //   (category) => !category.adminOnly,
  // );

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
