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
import BoardService from '../../services/BoardService';
import { useNavigate, useLocation } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import IconButton from '@mui/material/IconButton';
import { useRecoilValue } from 'recoil';
import { presentCommunityTypeState } from '../../features/Board/atom';

const ariaLabel = { 'aria-label': 'description' };

// interface articleData {
//   [index: string]: string;
// }

const ArticleWrite: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    type: number;
    communityId: number | undefined;
  };
  const { type, communityId } = state;

  const presentCommunityType = useRecoilValue(presentCommunityTypeState);

  // const communityId = 367;
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [isDone, setIsDone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<Array<any>>([]);
  const [previewImageFiles, setPreviewImageFiles] = useState<Array<any>>([]);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles([]);
    const maxSize = 10 * 1024 * 1024;
    const fileArr = event.target.files; // 10MB
    //const files = event.target.files;
    // console.log(files);

    // 10MB ???????????? alert
    // if (files !== null) {
    //   // console.log(files[0]);
    //   const size
    //     = files[0].size;
    //   if (size > maxSize) {
    //     Swal.fire({
    //       icon: 'warning',
    //       text: '10MB ????????? ????????? ????????? ???????????????',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     return;
    //   }
    //   setImageFiles([...imageFiles, files[0]]);
    // }

    let fileURLs: string[] = [];

    if (fileArr !== null) {
      const temp = [];
      let file;
      let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

      for (let i = 0; i < filesLength; i++) {
        file = fileArr[i];
        const size = file.size;
        if (size > maxSize) {
          Swal.fire({
            icon: 'warning',
            text: '10MB ????????? ????????? ????????? ???????????????',
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

    if (presentCommunityType !== 3 && category === '') {
      Swal.fire({
        icon: 'warning',
        text: '????????? ???????????????',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (title.length < 1) {
      Swal.fire({
        icon: 'warning',
        text: '????????? ??????????????????',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    if (content.length < 5) {
      Swal.fire({
        icon: 'warning',
        text: '????????? 5??? ?????? ??????????????????',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // ????????? ??????
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('img', imageFiles[i] as any);
    }

    // ??????????????? ?????? -> articleData??? type ?????? ??????(key??? string, ?????? string?????? ?????? ??????)
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

    if (category === '??????') {
      formData.append('communityId', '0');
    } else {
      formData.append('communityId', String(communityId));
    }
    formData.append('title', title);
    formData.append('contents', content);

    if (presentCommunityType !== 3) {
      formData.append('category', category);
    }

    if (category === '????????????' || category === '??????' || category === '??????') {
      formData.append('contact', phoneNumber);
      formData.append('isDone', String(isDone));
    }

    await BoardService.createNewArticle(formData)
      .then((res) => {
        // ????????? ???????????? ??????
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        {presentCommunityType !== 3 && (
          <DivContainer>
            <ArticleCategory category={category} setCategory={setCategory} />
          </DivContainer>
        )}
        {/* <Box
          component="form"
          sx={{
            '& > :not(style)': {
              m: 1,
              // minWidth: 410,
              // width: '100vw',
              fontSize: 16,
              fontFamily: 'MinSans-Regular',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <Input
            type="text"
            placeholder="????????? ??????????????????."
            // inputProps={ariaLabel}
            // value={value}
            onChange={changeTitle}
          />
        </Box> */}
        <DivContainer>
          <InputCustom
            type="text"
            placeholder="????????? ??????????????????."
            // inputProps={ariaLabel}
            // value={value}
            onChange={changeTitle}
            sx={{
              width: '100%',
              fontSize: 16,
              fontFamily: 'MinSans-Regular',
            }}
          />
        </DivContainer>

        {/* <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              minWidth: 410,
              fontSize: 16,
              // fontFamily: 'MinSans-Regular',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-multiline-static"
              label="??? ??????"
              multiline
              rows={10}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'MinSans-Regular',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'MinSans-Regular',
                },
              }}
              onChange={changeContent}
            />
          </div>
        </Box> */}

        <DivContainer>
          <TextFieldWrapper>
            <TextField
              id="outlined-multiline-static"
              label="??? ??????"
              multiline
              rows={10}
              size="small"
              sx={{
                'width': '100%',
                'fontSize': 16,

                '& .MuiInputLabel-root': {
                  fontFamily: 'MinSans-Regular',
                },
                '& label.Mui-focused': {
                  color: 'rgb(186, 230, 229)',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: ' rgb(186, 230, 229);',
                },
                '& .MuiOutlinedInput-root': {
                  'fontFamily': 'MinSans-Regular',
                  '& fieldset': {
                    borderColor: '#000',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgb(186, 230, 229)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgb(186, 230, 229)',
                  },
                },
              }}
              onChange={changeContent}
            />
          </TextFieldWrapper>
        </DivContainer>

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
            margin: '0px 20px 10px',
            // m: 1,
            // minWidth: 410,
          }}
        >
          {(category === '????????????' ||
            category === '??????' ||
            category === '??????') && (
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{
                marginRight: 'auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '210px',
                }}
              >
                <ButtonCustom sx={{ height: '25px' }}>????????????</ButtonCustom>
                <PhoneNumber
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
              </div>
              <ButtonCustom>
                <div>????????????</div>
                <Switch
                  checked={isDone}
                  onChange={handleIsDoneChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </ButtonCustom>
            </ButtonGroup>
          )}

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
        {/* {category === '????????????' ||
        category === '??????' ||
        category === '??????' ? (
          <>
            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{
                margin: '0px 20px 10px',
                // m: 1,
                // minWidth: 410,
              }}
            >
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <ButtonCustom>????????????</ButtonCustom>
                <PhoneNumber
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />
                <ButtonCustom>
                  <div>????????????</div>
                  <Switch
                    checked={isDone}
                    onChange={handleIsDoneChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </ButtonCustom>
              </ButtonGroup>
            </Box>
          </>
        ) : undefined} */}
        <DivContainer>
          <SubmitButtonCustom onClick={onSubmit}>??????</SubmitButtonCustom>
        </DivContainer>
      </Container>
    </>
  );
};

const TextFieldWrapper = styled.div`
  width: 100%;

  & .MuiInputLabel-root.Mui-focused {
    color: rgb(186, 230, 229);
  }
`;
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
  align-items: center;
`;

const ButtonCustom = styled(Button)`
  font-family: 'MinSans-Regular';
  flex-direction: column;
  background-color: #bae6e5;
  font-size: 14px;
  padding: 0px 10px;
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
  box-shadow: none;
  color: white;
  width: 300px;
  min-height: 45px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';
  font-size: 16px;
  height: 50px;

  &:hover {
    background-color: #ffb2a9;
    color: white;
  }
`;

const InputCustom = styled(Input)`
  &::after {
    border-bottom: 2px solid rgb(186, 230, 229);
  }
`;

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 20px;

  & .MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    border-bottom: 2px solid rgb(186, 230, 229);
  }
`;
export default ArticleWrite;
