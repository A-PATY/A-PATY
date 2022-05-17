import styled from '@emotion/styled';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';

const Main: React.FC = () => {
  let navigate = useNavigate();

  const userInfo = useRecoilValue(userInfoState);

  const handleButtonCustomClick = () => {
    if (userInfo === null) {
      navigate('/login');
    } else {
      navigate('/local_community');
    }
  };

  return (
    <>
      <FirstBox>
        <FirstSection>
          <BirdContainer>
            <BirdWrapper>
              <BirdOuter>
                <BirdInner>
                  <Bird src="\img\bird.gif" />
                </BirdInner>
              </BirdOuter>
            </BirdWrapper>
          </BirdContainer>
          <PhoneContainer>
            <DescriptionContainer>
              <DescriptionWrapper>
                <Description>
                  소식을 나누고
                  <DescriptionBr />
                  정보를 공유하고
                  <DescriptionBr />
                  서로를 알게되는
                </Description>
              </DescriptionWrapper>
            </DescriptionContainer>
            <PhoneFrameContainer>
              <PhoneFrameWrapper>
                <PhoneFrame>
                  <PhoneInner src="\img\service.png" />
                  {/* <PhoneHeader>
                    <LeftGrid>
                      <LeftArrow></LeftArrow>
                      <PhoneHeaderText>잠실동</PhoneHeaderText>
                    </LeftGrid>
                    <RightGrid>
                      <SearchIcon />
                      <WriteIcon />
                      <AlertIcon />
                    </RightGrid>
                  </PhoneHeader> */}
                </PhoneFrame>
              </PhoneFrameWrapper>
            </PhoneFrameContainer>
          </PhoneContainer>
        </FirstSection>
        <SecondSection>
          <IntroductionContainer>
            <IntroductionOuter>
              <IntroductionInner>
                <IntroductionBanner>
                  <IntroductionPictureContainer>
                    <IntroductionPictureWrapper>
                      <IntroductionPicture src="\img\spt1.jpeg" />
                    </IntroductionPictureWrapper>
                  </IntroductionPictureContainer>
                </IntroductionBanner>
              </IntroductionInner>
            </IntroductionOuter>
          </IntroductionContainer>
          <IntroductionTextContainer>
            <IntroductionQuestion>
              <ApartmentRoundedIconCustom />
              <IntroductionText>A : PATY는 무슨 서비스인가요?</IntroductionText>
            </IntroductionQuestion>
          </IntroductionTextContainer>
        </SecondSection>
        <ServiceButtonWrapper>
          <ButtonCustom onClick={handleButtonCustomClick}>
            A : PATY 시작하기
          </ButtonCustom>
        </ServiceButtonWrapper>
      </FirstBox>
    </>
  );
};

const FirstBox = styled(Box)`
  height: 100vh;
`;

const FirstSection = styled.div`
  height: 582px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const BirdContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: visible;
  align-items: center;
`;

const BirdWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BirdOuter = styled.div`
  transform: translate(-90%, 110%) scale(0.6);
`;

const BirdInner = styled.div`
  transform: translate3d(0%, -13.6992%, 0px);
`;

const Bird = styled.img`
  width: 100px;
  height: auto;
  fill: none;
`;

const PhoneContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  position: relative;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const DescriptionWrapper = styled.div`
  margin-bottom: 0rem;
`;

const Description = styled.h1`
  font-family: 'Yeongdo-Rg';
  font-size: 25px;
  line-height: 120%;
  margin-top: 160px;
  color: #ffd0b6;
`;

const DescriptionBr = styled.br`
  font-size: 2rem;
  line-height: 120%;
  margin-top: 5.125rem;
`;

const PhoneFrameContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

const PhoneFrameWrapper = styled.div`
  height: 31.875em;
  width: 28.125em;
  font-size: 0.625rem;
  overflow: hidden;
`;

const PhoneFrame = styled.div`
  height: 31.875em;
  width: 20.625em;
  margin: 0 auto;
  border: 0.5em solid #ffd0b6;
  overflow: hidden;
  border-radius: 3.375em 3.375em 0 0;
  position: relative;
  background: white;
`;

const PhoneInner = styled.img`
  height: 31.875em;
  width: 19.625em;
`;

const PhoneHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.75em 1em;
  margin-top: 1em;
  font-family: 'MinSans-Bold';
`;
const LeftGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-column-gap: 0.25em;
`;

const LeftArrow = styled(KeyboardArrowLeftRoundedIcon)`
  width: 16px;
  height: 16px;
`;

const PhoneHeaderText = styled.div`
  font-size: 1.125em;
  font-weight: bold;
  align-self: center;
`;

const RightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-column-gap: 0.875em;
`;

const SearchIcon = styled(SearchRoundedIcon)`
  width: 16px;
  height: 16px;
`;

const WriteIcon = styled(ModeEditOutlineRoundedIcon)`
  width: 16px;
  height: 16px;
`;

const AlertIcon = styled(NotificationsRoundedIcon)`
  width: 16px;
  height: 16px;
`;

// const ServiceButtonWrapper = styled.div`
//   display: flex;
//   position: sticky;
//   bottom: 0px;
//   // width: 100%;
//   padding: 1rem;
//   box-sizing: border-box;
//   z-index: 1;
// `;

const ServiceButtonWrapper = styled.div`
  position: sticky;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: scale(100%);
  transition: 2s;
  align-items: center;
  display: flex;
  margin: 20px;
`;

const ButtonCustom = styled(Button)`
  background-color: #bae6e5;
  margin: 20px;
  box-shadow: none;
  color: white;
  width: 300px;
  min-height: 56px;
  border-radius: 126px;
  font-family: 'MinSans-Regular';
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: none;
    text-decoration: none;
    background-color: #95e3e1;
  }
`;

const SecondSection = styled.div`
  margin-top: 25px;
  overflow: hidden;
  height: 500px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntroductionContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  filter: brightness(0.5);
`;

const IntroductionOuter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const IntroductionInner = styled.div`
  position: absolute;
  inset: 0px;
`;

const IntroductionBanner = styled.div`
  position: absolute;
  top: -20%;
  right: 0;
  bottom: -20%;
  left: 0;
`;
const IntroductionPictureContainer = styled.div`
  transform: translateY(12%);
  height: 600px;
  width: 100%;
  position: relative;
`;
const IntroductionPictureWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const IntroductionPicture = styled.img`
  /* opacity: 1; */
  bottom: 0;
  height: 100%;
  left: 0;
  margin: 0;
  max-width: none;
  padding: 0;
  /* position: absolute; */
  right: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
  transform: translateZ(0);
  transition: opacity 0.25s linear;
  will-change: opacity;
`;
const IntroductionTextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  width: 100%;
  margin: 0px auto;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const IntroductionQuestion = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const ApartmentRoundedIconCustom = styled(ApartmentRoundedIcon)`
  width: 24px;
  height: 24px;
`;

const IntroductionText = styled.div`
  margin-left: 0.25rem;
`;
export default Main;
