import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import { category } from '../../types/boardTypes';
import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../features/Board/atom';

interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const ArticleCategory: React.FC<Props> = ({ category, setCategory }) => {
  // const categories: category[] = [
  //   { key: 0, label: '전체' },
  //   { key: 1, label: '일상' },
  //   { key: 2, label: '정보' },
  //   { key: 3, label: '나눔장터' },
  //   { key: 4, label: '헬프' },
  //   { key: 5, label: '육아' },
  //   { key: 6, label: '공구' },
  //   { key: 7, label: '후기' },
  // ];
  const categories: category[] | null = useRecoilValue(categoryListState);

  const [label, setLabel] = React.useState(category);

  const handleChange = (event: SelectChangeEvent) => {
    setLabel(event.target.value);
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 410 }}>
        <Select
          value={label}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ fontSize: 16, fontFamily: 'MinSans-Regular' }}
        >
          <MenuItem value="">
            <em>주제를 골라주세요.</em>
          </MenuItem>
          {categories?.map((category) => {
            return (
              <MenuItem key={category.categoryId} value={category.categoryName}>
                {category.categoryName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ArticleCategory;
