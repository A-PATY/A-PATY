import { useState } from 'react';
import ArticleCategory from './ArticleCategory';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from '@emotion/styled';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
const ariaLabel = { 'aria-label': 'description' };

const ArticleWrite: React.FC = () => {
  return (
    <>
      <ArticleCategory />

      <Box
        component="form"
        sx={{
          '& > :not(style)': {
            m: 1,
            minWidth: 410,
            fontSize: 16,
            fontFamily: 'MinSans-Regular',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Input placeholder="제목을 입력해주세요" inputProps={ariaLabel} />
      </Box>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            minWidth: 410,
            fontSize: 16,
            fontFamily: 'MinSans-Regular',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="글 내용"
            multiline
            rows={18}
          />
        </div>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{
          m: 1,
          minWidth: 410,
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <ButtonCustom>
            <AddAPhotoRoundedIcon />
          </ButtonCustom>
          <ButtonCustom>전화번호</ButtonCustom>
          <ButtonCustom>마감여부</ButtonCustom>
        </ButtonGroup>
      </Box>
    </>
  );
};

const ButtonCustom = styled(Button)`
  background-color: #bae6e5;

  &:hover {
    background-color: #ffb2a9;
  }

  &.MuiButtonGroup-grouped:not(:last-of-type) {
    border-color: #fff;
  }
`;
export default ArticleWrite;
