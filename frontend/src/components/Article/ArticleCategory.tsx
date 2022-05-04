import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from '@emotion/styled';
import FormControl from '@mui/material/FormControl';
import { category } from '../../types/boardTypes';

const ArticleCategory = () => {
  const categories: category[] = [
    { key: 0, label: '전체' },
    { key: 1, label: '일상' },
    { key: 2, label: '정보' },
    { key: 3, label: '나눔장터' },
    { key: 4, label: '헬프' },
    { key: 5, label: '육아' },
    { key: 6, label: '공구' },
    { key: 7, label: '후기' },
  ];
  const [label, setLabel] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setLabel(event.target.value);
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
          {categories.map((category) => {
            return (
              <MenuItem key={category.key} value={category.key}>
                {category.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ArticleCategory;