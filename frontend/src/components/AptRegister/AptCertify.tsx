import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import AptRegisterService from '../../services/AptRegisterService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface Props {
  aptId: number;
  doroJuso: string;
}

const AptCertify: React.FC<Props> = ({ aptId, doroJuso }) => {
  const [showError, setShowError] = useState<boolean>(false);
  const [aptNameError, setAptNameError] = useState<boolean>(false);
  const [aptName, setAptName] = useState<string>('');
  const [dong, setDong] = useState<string>('');
  const [dongError, setDongError] = useState<boolean>(false);
  const [ho, setHo] = useState<string>('');
  const [hoError, setHoError] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const [imageFileError, setImageFileError] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState('');
  const AptRegister = new FormData();
  let navigate = useNavigate();
  useEffect(() => {
    if (aptName === '') {
      setAptNameError(true);
    } else {
      setAptNameError(false);
    }
    if (dong === '') {
      setDongError(true);
    } else {
      setDongError(false);
    }
    if (ho === '') {
      setHoError(true);
    } else {
      setHoError(false);
    }
    if (imageFile === null) {
      setImageFileError(true);
    } else {
      setImageFileError(false);
    }
  }, [aptName, dong, ho, imageFile]);

  const handleImageContainerWrapperClick = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files },
    }: any = event;
    const theImgFile = files[0];
    const reader = new FileReader();

    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      setPreviewImg(result);
    };

    reader.readAsDataURL(theImgFile);
    setImageFile(theImgFile);
  };

  const getAptInfo = () => {
    if (imageFile != null) {
      AptRegister.append('image', imageFile);
    }

    AptRegister.append('aptId', aptId as any);
    AptRegister.append('aptName', aptName);
    AptRegister.append('dong', dong);
    AptRegister.append('ho', ho);
    AptRegister.append('doroJuso', doroJuso);
    return AptRegister;
  };

  const validation = () => {
    if (!aptNameError && !dongError && !hoError && !imageFileError) {
      return true;
    } else {
      return false;
    }
  };
  const handleSConfirmButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const data: FormData = getAptInfo();
    if (validation()) {
      AptRegisterService.aptRegisterRequest(data)
        .then(({ message }) => {
          Swal.fire({
            title: message,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          });

          navigate('/local_community');
        })
        .catch(({ message }) => {
          Swal.fire({
            title: message,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        });
    } else {
      setShowError(true);
    }
  };

  const handleAptNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAptName(event.target.value);
    if (event.target.value === '') {
      setAptNameError(true);
    } else {
      setAptNameError(false);
    }
  };

  const handleDongInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDong(event.target.value);
    if (event.target.value === '') {
      setDongError(true);
    } else {
      setDongError(false);
    }
  };

  const handleHoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHo(event.target.value);
    if (event.target.value === '') {
      setHoError(true);
    } else {
      setHoError(false);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <AddImage>
            <Title>고지서 첨부 예시</Title>
            <SampleImage
              alt="sample"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYjtD5S5JEyjfJ_gBphpouen1mgNyOBHe_A&usqp=CAU"
            ></SampleImage>

            {/* <Label htmlFor="contained-button-file">
              <ImageButton>사진 고르기</ImageButton>
            </Label>
            <Input
              id="contained-button-file"
              type="file"
              accept="image/*"
              onChange={handleImageContainerWrapperClick}
            /> */}

            {!imageFile && (
              <>
                <FileInputLabel htmlFor="bill-image-file">
                  <PreviewContainer>
                    <StyledIcon />
                  </PreviewContainer>
                </FileInputLabel>
                <Input
                  id="bill-image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageContainerWrapperClick}
                />
              </>

              //   <ImageWrapper>
              //     <Image src="..." alt="picture"></Image>
              //   </ImageWrapper>
              // </PreviewContainer>
            )}
            {imageFile && (
              <ImageContainer>
                <ImageWrapper>
                  <Image src={previewImg} alt="picture"></Image>
                </ImageWrapper>
              </ImageContainer>
            )}
            {showError && imageFileError && (
              <ErrorMessage>고지서를 첨부해주세요.</ErrorMessage>
            )}
          </AddImage>
          <StyledTextFieldWrapper>
            <StyledTextField
              value={aptName}
              error={showError && aptNameError}
              helperText={
                showError && aptNameError ? '아파트 이름을 입력해주세요.' : ''
              }
              variant="outlined"
              label={'아파트'}
              onChange={handleAptNameInputChange}
            ></StyledTextField>
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <StyledTextField
              value={dong}
              error={showError && dongError}
              helperText={
                showError && dongError ? '동 정보를 입력해주세요.' : ''
              }
              variant="outlined"
              label={'동'}
              onChange={handleDongInputChange}
            ></StyledTextField>
          </StyledTextFieldWrapper>
          <StyledTextFieldWrapper>
            <StyledTextField
              value={ho}
              error={showError && hoError}
              helperText={showError && hoError ? '호 정보를 입력해주세요.' : ''}
              variant="outlined"
              label={'호'}
              onChange={handleHoInputChange}
            ></StyledTextField>
          </StyledTextFieldWrapper>
          {/* <ButtonWrapper>
            <NextButton>확 인</NextButton>
            {imageFile ? (
              <NextButton>확 인</NextButton>
            ) : (
              <DefaultButton>확 인</DefaultButton>
            )}
          </ButtonWrapper> */}
          <StyledTextFieldWrapper>
            <ConfirmButton onClick={handleSConfirmButtonClick}>
              승인 요청
            </ConfirmButton>
          </StyledTextFieldWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

const StyledTextFieldWrapper = styled.div`
  margin-top: 10px;

  &:last-child {
    margin-top: 30px;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputLabel-root {
    font-family: 'MinSans-Regular';
    font-size: 14px;

    &.Mui-error {
      color: #bae6e5;
    }

    &.Mui-focused {
      color: #000;
    }
  }

  & .MuiOutlinedInput-root {
    overflow: hidden;
    border: none;
    border-radius: 31.5px;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;
    font-family: 'MinSans-Regular';
    font-size: 14px;
    width: 250px;
    height: 50px;
    background-color: rgb(255, 255, 255);
  }

  & .MuiOutlinedInput-notchedOutline {
    border-style: none;
  }

  & .MuiFormHelperText-root {
    color: #bae6e5;
    font-family: 'MinSans-Regular';

    &.Mui-error {
      color: #bae6e5;
    }
  }

  /* margin: 3.2px 0px 0px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  width: 250px;
  border: none;
  border-radius: 126px;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;

  & .MuiOutlinedInput-notchedOutline {
    border-style: none;
  } */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  //height: calc((100% - 70px) - 70px);
  overflow: hidden auto;
`;

const Wrapper = styled.div`
  margin: 20px 10px 10px;
  overflow: hidden auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #bae6e5;
  font-family: 'MinSans-Regular';
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
`;
const AddImage = styled.div`
  font-family: 'MinSans-Regular';
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-family: 'MinSans-Regular';
  color: #bae6e5;
  margin: 10px 0px 0px 15px;
  align-self: start;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Label = styled.label`
  min-width: 300px;
  margin: auto;
  text-align: right;
`;

const Input = styled.input`
  display: none;
`;

const ImageButton = styled(Button)`
  display: inline-flex;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8125rem;
  min-width: 64px;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: #bae6e5;
  box-shadow: none;
  color: white;
  &:hover {
    background-color: #95c1c1;
    box-shadow: none;
  }
`;

const SampleImage = styled.img`
  width: 300px;
  margin: 0px 0px 20px;
  border-radius: 4px;
`;

const PreviewContainer = styled.div`
  margin: 0px 10px 10px;
  min-width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FileInputLabel = styled.label`
  box-sizing: border-box;
  cursor: pointer;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute; */
`;

const StyledIcon = styled(ImageIcon)`
  width: 55px;
  height: 55px;
  color: lightgray;
`;

const Image = styled.img`
  /* opacity: 0; */
  max-width: 100%;
`;

const ImageContainer = styled.div`
  margin: 0px 10px;
  min-width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ImageWrapper = styled.div`
  max-height: 300px;
  max-width: 300px;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const ConfirmButton = styled(Button)`
  background-color: #bae6e5;
  color: white;
  width: 250px;
  height: 50px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #95c1c1;
  }
`;

const NextButton = styled(Button)`
  cursor: pointer;
  font-weight: 500;
  padding: 8px 22px;
  background-color: #bae6e5;
  box-shadow: none;
  color: white;
  margin: 20px 0px;
  min-width: 64px;
  width: 300px;
  height: 50px;
  border-radius: 15px;
  &:hover {
    text-decoration: none;
    background-color: #95c1c1;
    box-shadow: none;
  }
`;

const DefaultButton = styled(Button)`
  color: rgba(0, 0, 0, 0.26);
  box-shadow: none;
  background-color: rgba(0, 0, 0, 0.12);
  pointer-events: none;
  cursor: default;
  font-weight: 500;
  width: 300px;
  height: 50px;
  margin-top: 20px;
  padding: 8px 22px;
  border-radius: 15px;
`;

export default AptCertify;
