import { useState } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';


const AptCertify: React.FC = () => {
  const [imageFile, setImageFile] = useState(null);
  const [previewImg, setPreviewImg] = useState('');

  const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    // const image = event.currentTarget.files[0];
    
    // reader.readAsDataURL(image);
    // reader.onloadend = () => {
    //   setPreviewImg(reader.result);
    // }
    // setImageFile(image);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <AddImage>
            <Title>고지서 첨부</Title>
            <Label htmlFor="contained-button-file">
              <Input id="contained-button-file" type="file" onChange={changeImage}></Input>
              <ImageButton>사진 고르기</ImageButton>
            </Label>
            <SampleImage alt="sample" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYjtD5S5JEyjfJ_gBphpouen1mgNyOBHe_A&usqp=CAU"></SampleImage>
            {
              !imageFile &&
              <PreviewContainer>
                <IconBox>
                  <StyledIcon/>
                </IconBox>
                <ImageWrapper>
                  <Image src="..." alt="picture"></Image>
                </ImageWrapper>
              </PreviewContainer>
            }
            {
              imageFile &&
              <ImageContainer>
                <ImageWrapper>
                  <Image src={previewImg} alt="picture"></Image>
                </ImageWrapper>
              </ImageContainer>
            }
          </AddImage>
            <StyledTextField variant="outlined" label={"아파트"}></StyledTextField>
            <StyledTextField variant="outlined" label={"동"}></StyledTextField>
            <StyledTextField variant="outlined" label={"호수"}></StyledTextField>
          <ButtonWrapper>
            {
              imageFile ?
              <NextButton>확 인</NextButton> :
              <DefaultButton>확 인</DefaultButton>
            }
          </ButtonWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

const StyledTextField = styled(TextField)`
  margin: 3.2px 0px 0px;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  width: 250px;
  border: none;
  border-radius: 126px;
  box-shadow: rgb(0 0 0 / 5%) 0px 10px 30px;
  /* &.MuiOutlinedInput-root: {
      & fieldset: {
        border-color: white;
      };
  } */
  /* &.MuiOutlinedInput-root {
    border-color: yellow;
    & fieldset {
      border-color: yellow;
      color: yellow;
    };
  } */
  & label.Mui-focused {
    border-color: transparent;
  }
  &.MuiOutlinedInput-root fieldset {
    border-color: transparent;
    /* & fieldset {
      border-color: transparent,
    }
    &.Mui-focused fieldset {
      border-color: transparent;
    } */
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: calc((100% - 70px) - 70px);
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

const AddImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  color: #FFB2A9;
  margin: 10px 0px 0px 15px;
  align-self: start;
  font-weight: 600;
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
  background-color: #BAE6E5;
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
  margin: 0px 10px 30px;
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

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
`;

const StyledIcon = styled(ImageIcon)`
  width: 55px;
  height: 55px;
  color: lightgray;
`;

const Image = styled.img`
  opacity: 0;
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

const NextButton = styled(Button)`
  cursor: pointer;
  font-weight: 500;
  padding: 8px 22px;
  background-color: #BAE6E5;
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
