import { useState } from 'react';
import ArticleCategory from './ArticleCategory';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from '@emotion/styled';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import Switch from '@mui/material/Switch';
import PhoneNumber from './PhoneNumber';

const ariaLabel = { 'aria-label': 'description' };

const ArticleWrite: React.FC = () => {
  const [category, setCategory] = useState<string>('');

  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <Container>
        <ArticleCategory setCategory={setCategory} />
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
          <Input placeholder="제목을 입력해주세요." inputProps={ariaLabel} />
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
          </ButtonGroup>
        </Box>
        {category === '나눔장터' || category === '공구' ? (
          <>
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
                <ButtonCustom>전화번호</ButtonCustom>
                <PhoneNumber></PhoneNumber>
                <ButtonCustom>
                  마감여부
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </ButtonCustom>
              </ButtonGroup>
            </Box>
          </>
        ) : undefined}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  height: calc((100% - 70px) - 70px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ButtonCustom = styled(Button)`
  background-color: #bae6e5;
  font-size: 14px;
  &:hover {
    background-color: #ffb2a9;
  }

  &.MuiButtonGroup-grouped:not(:last-of-type) {
    border-color: #fff;
  }
`;
export default ArticleWrite;
