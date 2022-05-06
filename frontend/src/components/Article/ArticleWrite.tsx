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
import Swal from 'sweetalert2';

const ariaLabel = { 'aria-label': 'description' };

// interface articleData {
//   [index: string]: string;
// }

const ArticleWrite: React.FC = () => {
  const communityId = 367;
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<Array<any>>([]);
  const [contact, setContact] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(true);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setContent(event.target.value);
  };

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const files = event.target.files;
    // console.log(files);

    // 10MB 이상이면 alert
    if (files !== null) {
      // console.log(files[0]);
      const size = files[0].size;
      if (size > maxSize) {
        Swal.fire({
          icon: 'warning',
          text: '10MB 이하의 파일만 업로드 가능합니다',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      setImageFiles([...imageFiles, files[0]]);
    }
  };

  const changeContact = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append(
    //   'img',
    //   '[' + imageFiles.map((file) => file.toString()).join(',') + ']',
    // ); // 첨부파일

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('img', imageFiles[i] as any);
    }

    if (content.length < 5) {
      Swal.fire({
        icon: 'warning',
        text: '내용을 5자 이상 작성해주세요',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // 반복문으로 처리 -> articleData의 type 문제 발생(key도 string, 값도 string으로 하면 될듯)
    // const articleData: articleData = {
    //   communityId: communityId,
    //   category: category,
    //   title: title,
    //   contents: content,
    //   // contact: contact,
    //   // isDone: isDone
    // };
    // for (let key in articleData) {
    //   formData.append(key, articleData[key]);
    // }

    formData.append('communityId', String(communityId));
    formData.append('category', category);
    formData.append('title', title);
    formData.append('contents', content);
    // formData.append('contact', contact);
    // formData.append('isDone', isDone);

    console.log(formData.get('communityId'));
    console.log(formData.get('category'));
    console.log(typeof formData.get('communityId'));
    console.log(formData.getAll('img'));
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
          <Input
            type="text"
            placeholder="제목을 입력해주세요."
            // inputProps={ariaLabel}
            // value={value}
            onChange={changeTitle}
          />
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
              onChange={changeContent}
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
              <UploadLabel htmlFor="image">
                <AddAPhotoRoundedIcon style={{ margin: '9px' }} />
              </UploadLabel>
            </ButtonCustom>
          </ButtonGroup>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            onChange={changeImage}
          />
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
                    checked={isDone}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </ButtonCustom>
              </ButtonGroup>
            </Box>
          </>
        ) : undefined}

        <button onClick={onSubmit}>Submit</button>
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

const UploadLabel = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const ButtonCustom = styled(Button)`
  background-color: #bae6e5;
  font-size: 14px;
  padding: 0px;
  &:hover {
    background-color: #ffb2a9;
  }

  &.MuiButtonGroup-grouped:not(:last-of-type) {
    border-color: #fff;
  }
`;
export default ArticleWrite;
