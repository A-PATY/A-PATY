import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import { category } from '../../types/boardTypes';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../features/Board/atom';
import { userInfoState } from '../../features/Login/atom';

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const ArticleCategory: React.FC<Props> = ({ category, setCategory }) => {
  const userInfo = useRecoilValue(userInfoState);

  const categories = [];
  const categoryList = useRecoilValue(categoryListState);

  if (userInfo?.role === 'ROLE_ADMIN') {
    if (categoryList !== null) categories.push(...categoryList);
  } else if (userInfo?.role === 'ROLE_USER') {
    if (categoryList !== null)
      categories.push(
        ...categoryList?.filter((category) => !category.adminOnly),
      );
  }

  // const categories: category[] | null = useRecoilValue(categoryListState);

  const [label, setLabel] = React.useState<string>(category);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLabel(event.target.value);
    setCategory(event.target.value);
  };

  return (
    <>
      <div style={{ width: '100%' }}>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <Select
            value={label}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              'fontSize': 16,
              'fontFamily': 'MinSans-Regular',
              ':after': { borderBottom: `2px solid rgb(186, 230, 229)` },
            }}
          >
            <MenuItem value="">
              <em>주제를 골라주세요.</em>
            </MenuItem>
            {categories?.map((category) => {
              return (
                <MenuItem
                  key={category.categoryId}
                  value={category.categoryName}
                >
                  {category.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

const SelectCustom = styled(Select)`
  &::after {
    border-bottom: 2px solid rgb(186, 230, 229);
  }
`;
export default ArticleCategory;
