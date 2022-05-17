import React, { useEffect, useState } from 'react';
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
import BoardService from '../../services/BoardService';
import { useNavigate } from 'react-router-dom';
import { article } from '../../types/boardTypes';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useRecoilValue } from 'recoil';
import { presentCommunityTypeState } from '../../features/Board/atom';

const ariaLabel = { 'aria-label': 'description' };

interface Props {
  article: article;
}

const ArticleEdit: React.FC<Props> = ({ article }) => {
  const navigate = useNavigate();
  console.log(article);
  console.log(article.category);

  const presentCommunityType = useRecoilValue(presentCommunityTypeState);
  console.log('presentCommunityType');
  console.log(presentCommunityType);

  const [category, setCategory] = useState<string>(article.category);
  const [title, setTitle] = useState<string>(article.title);
  const [content, setContent] = useState<string>(article.contents);

  const [imageFiles, setImageFiles] = useState<Array<any>>([]); // 이미지는 나중에 구현
  const [previewImageFiles, setPreviewImageFiles] = useState<Array<any>>([]);
  const [imageList, setImageList] = useState(article.imgs);
  const [isDone, setIsDone] = useState(article.doneyn);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(
    article.contact,
  );

  useEffect(() => {
    if (article.imgs === null) {
      setImageList([]);
    }
  }, []);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setContent(event.target.value);
  };

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles([]);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const fileArr = event.target.files;

    let fileURLs: string[] = [];

    if (fileArr !== null && imageList !== null) {
      const temp = [];
      let file;
      let filesLength =
        fileArr.length + imageList.length > 10 ? 10 : fileArr.length;

      for (let i = 0; i < filesLength; i++) {
        file = fileArr[i];
        const size = file.size;
        if (size > maxSize) {
          Swal.fire({
            icon: 'warning',
            text: '10MB 이하의 파일만 업로드 가능합니다',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          // console.log(URL.createObjectURL(file));
          let reader = new FileReader();
          reader.onload = () => {
            fileURLs[i] = reader.result as string;
            setPreviewImageFiles([...fileURLs]);
          };
          reader.readAsDataURL(file);
          temp.push(file);
        }
      }
      setImageFiles(temp);
    }
    // const files = event.target.files;
    // console.log(files);

    // 10MB 이상이면 alert
    // if (files !== null) {
    //   // console.log(files[0]);
    //   const size = files[0].size;
    //   if (size > maxSize) {
    //     Swal.fire({
    //       icon: 'warning',
    //       text: '10MB 이하의 파일만 업로드 가능합니다',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     return;
    //   }
    //   setImageFiles([...imageFiles, files[0]]);
    // }
  };

  const handleDeleteButtonClickOfImageList =
    (selectedImgId: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (imageList !== null) {
        const findImageIndex = imageList.findIndex(
          (image) => image.id === selectedImgId,
        );

        const temp = [...imageList];

        if (findImageIndex !== -1) {
          temp.splice(findImageIndex, 1);
        }

        setImageList(temp);
      }
    };

  const handleDeleteButtonClick =
    (deleteImgFile: string) =>
    (index: number) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setPreviewImageFiles(
        previewImageFiles.filter(
          (previewImageFile) => previewImageFile !== deleteImgFile,
        ),
      );

      const temp = [...imageFiles];
      temp.splice(index, 1);
      setImageFiles(temp);
    };

  const handleIsDoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked);
  };

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    const formData = new FormData();

    if (category !== null && category === '') {
      Swal.fire({
        icon: 'warning',
        text: '주제를 골라주세요',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (title.length < 1) {
      Swal.fire({
        icon: 'warning',
        text: '제목을 입력해주세요',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
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

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('newImgs', imageFiles[i] as any);
    }

    if (imageList !== null) {
      if (imageList.length === 0) {
        formData.append('oldImgs', '[]');
      }

      for (let i = 0; i < imageList.length; i++) {
        formData.append('oldImgs', imageList[i].imgUrl);
      }
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

    formData.append('title', title);
    formData.append('contents', content);

    if (category !== null) {
      formData.append('category', category);
    }

    if (category === '나눔장터' || category === '공구' || category === '헬프') {
      formData.append('contact', String(phoneNumber));
      formData.append('isDone', String(isDone));
    }

    console.log(formData.get('category'));
    console.log(formData.getAll('img'));
    console.log(formData.get('isDone'));

    await BoardService.editArticle(String(article.articleId), formData)
      .then((res) => {
        console.log(res);
        // 게시판 목록으로 이동
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        {article.category !== null && (
          <ArticleCategory category={category} setCategory={setCategory} />
        )}
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
            value={title}
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
              placeholder="내용을 입력해주세요."
              multiline
              rows={18}
              value={content}
              onChange={changeContent}
            />
          </div>
        </Box>
        <Box
          sx={{
            '& > :not(style)': {
              m: 1,
              minWidth: 410,
              fontSize: 16,
              fontFamily: 'MinSans-Regular',
            },
          }}
        >
          <ImageList cols={10}>
            {imageList !== null &&
              imageList.map((image) => (
                <ImageListItem key={image.imgUrl}>
                  <ImgCustom
                    src={image.imgUrl}
                    alt={`${image.id}`}
                    loading="lazy"
                  />
                  <DeleteButton
                    onClick={handleDeleteButtonClickOfImageList(image.id)}
                  >
                    <ClearRoundedIconCustom />
                  </DeleteButton>
                </ImageListItem>
              ))}
            {previewImageFiles.map((item, index) => (
              <ImageListItem key={item}>
                <ImgCustom src={item} alt={item} loading="lazy" />
                <DeleteButton onClick={handleDeleteButtonClick(item)(index)}>
                  <ClearRoundedIconCustom />
                </DeleteButton>
              </ImageListItem>
            ))}
          </ImageList>
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
            multiple
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            onChange={changeImage}
          />
        </Box>
        {category === '나눔장터' ||
        category === '공구' ||
        category === '헬프' ? (
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
                <PhoneNumber
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
                <ButtonCustom>
                  마감여부
                  <Switch
                    checked={isDone !== null ? isDone : false}
                    onChange={handleIsDoneChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </ButtonCustom>
              </ButtonGroup>
            </Box>
          </>
        ) : undefined}

        <SubmitButtonCustom onClick={onSubmit}>Submit</SubmitButtonCustom>
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

const ImgCustom = styled.img`
  width: 50px;
  height: 50px;
`;

const DeleteButton = styled(IconButton)`
  position: absolute;
  border-radius: 20px;
  background-color: white;
  bottom: 30px;
  left: 35px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
`;

const ClearRoundedIconCustom = styled(ClearRoundedIcon)`
  font-size: 12px;
`;

const SubmitButtonCustom = styled(Button)`
  background-color: #bae6e5;
  margin: 0px 20px
  color: #ffb2a9;
  font-family: 'MinSans-Regular';
  font-size: 18px;
  padding: 0;
  &:hover {
    background-color: #ffb2a9;
    color: #bae6e5;
  }
`;
export default ArticleEdit;
