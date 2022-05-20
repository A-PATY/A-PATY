/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Fade } from 'react-awesome-reveal';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
const Main: React.FC = () => {
  //   <Tooltip title="이여진">
  //   <a
  //     href="https://github.com/limejin"
  //     target="_blank"
  //     rel="noreferrer"
  //   >
  //     <Avatar css={avatar} alt="Cindy Baker" src="\img\bird.png" />
  //   </a>
  // </Tooltip>
  const developerList = [
    {
      name: '방의진',
      href: 'https://github.com/llunaB',
      img: '\\img\\crab.png',
    },
    {
      name: '손영배',
      href: 'https://github.com/dudqo225',
      img: '\\img\\penguin.png',
    },

    {
      name: '조은솔',
      href: 'https://github.com/escho0212',
      img: '\\img\\rabbit.png',
    },
    {
      name: '김선민',
      href: 'https://github.com/smkim09',
      img: '\\img\\fox.png',
    },
    {
      name: '이여진',
      href: 'https://github.com/limejin',
      img: '\\img\\bird.png',
    },
    {
      name: '채예은',
      href: 'https://github.com/devyen',
      img: '\\img\\otter.png',
    },
  ];
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
                <Fade>
                  <Description>
                    소식을 나누고
                    <DescriptionBr />
                    정보를 공유하고
                    <DescriptionBr />
                    서로를 알게되는
                  </Description>
                </Fade>
              </DescriptionWrapper>
            </DescriptionContainer>
            <PhoneFrameContainer>
              <PhoneFrameWrapper>
                <PhoneFrame>
                  <PhoneInner src="/img/infiniteScroll.gif" style={{ filter: "brightness(1.1)" }} />
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
                      <IntroductionPicture src="\img\apt.jpeg" />
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
            <IntroductionAnswer>
              <IntroductionAnswerH2>
                아파트 주민들을 위한 커뮤니티 공간으로
                <br />
                <br />
                배달비 부담을 덜고 싶을 때!
                <br />
                층간 소음 문제로 고민일 때!
                <br />
                이웃과 친해지고 싶을 때!
                <br />
                이사와서 동네 정보를 얻고 싶을 때!
                <br />
                이웃과 내 일상을 공유하고 싶을 때!
                <br />
                사랑하는 가족의 위치가 궁금할 때!
                <br />
                마음을 나누고 싶을 때!
              </IntroductionAnswerH2>
            </IntroductionAnswer>
          </IntroductionTextContainer>
        </SecondSection>
        <Section>
          <AdvantageDescriptionWrapper>
            <AdvantageDescriptionOne>
              <AdvantageDescriptionOneH3>
                <AdvantageDescriptionOneStrong>
                  자유로운 소통공간
                </AdvantageDescriptionOneStrong>
                <br />
                <br />
                위치 인증과 고지서 인증을 통해
                <br />
                신뢰 기반 커뮤니티 이용이 가능합니다.
              </AdvantageDescriptionOneH3>
            </AdvantageDescriptionOne>
            <AdvantageIconContainer>
              <AdvantageIconWrapper>
                <ReceiptLongIcon css={iconCustom} sx={{ color: '#f99084' }} />
                <AdvantageSpan>고지서 인증</AdvantageSpan>
              </AdvantageIconWrapper>
              <AdvantageIconWrapper>
                <LockRoundedIcon css={iconCustom} sx={{ color: '#f99084' }} />
                <AdvantageSpan>게시판 분리</AdvantageSpan>
              </AdvantageIconWrapper>
            </AdvantageIconContainer>
            <Fade delay={500}>
              <PhoneFrameContainer>
                <PhoneFrameWrapper>
                  <PhoneFrame>
                    <PhoneInner src="/img/aptRegister.gif" />
                  </PhoneFrame>
                </PhoneFrameWrapper>
              </PhoneFrameContainer>
            </Fade>
          </AdvantageDescriptionWrapper>
        </Section>
        <Section css={backgroundpurple}>
          <AdvantageDescriptionWrapper>
            <AdvantageDescriptionOne>
              <AdvantageDescriptionOneH3>
                <AdvantageDescriptionOneStrong css={purple}>
                  아파트 내 우리 가족 찾기
                </AdvantageDescriptionOneStrong>
                <br />
                <br />
                실시간 위치 추적을 통해
                <br />
                사랑하는 가족들의 위치를 알 수 있습니다.
              </AdvantageDescriptionOneH3>
            </AdvantageDescriptionOne>
            <AdvantageIconContainer>
              <AdvantageIconWrapper>
                <LocationOnRoundedIcon
                  css={iconCustom}
                  sx={{ color: '#b65ee6' }}
                />
                <AdvantageSpan>실시간 위치 추적</AdvantageSpan>
              </AdvantageIconWrapper>
              <AdvantageIconWrapper>
                <FavoriteRoundedIcon
                  css={iconCustom}
                  sx={{ color: '#b65ee6' }}
                />
                <AdvantageSpan>가족들의 안전</AdvantageSpan>
              </AdvantageIconWrapper>
            </AdvantageIconContainer>
            <PhoneFrameContainer>
              <FindFamilyContainer>
                <Fade>
                  <PhoneFrameWrapper id="phone">
                    <PhoneFrame css={purpleborder}>
                      <PhoneInner src="\img\service.png" />
                    </PhoneFrame>
                  </PhoneFrameWrapper>
                </Fade>
                <FindFamilyWrapper>
                  <Fade delay={500}>
                    <FindFamilyAlert>
                      <FindFamilyAlertImg src="/img/alarm.gif" style={{ filter: "brightness(1.07)" }}/>
                    </FindFamilyAlert>
                  </Fade>
                  <Fade delay={1000}>
                    <FamilyList>
                      <FamilyListImage src="/img/findFamily.gif" style={{ filter: "brightness(1.07)" }} />
                    </FamilyList>
                  </Fade>
                </FindFamilyWrapper>
              </FindFamilyContainer>
            </PhoneFrameContainer>
          </AdvantageDescriptionWrapper>
        </Section>
        <LastSection>
          <LastDescriptionTitle>이웃과 친해져봐요</LastDescriptionTitle>
          <LastDescriptionWrapper>
            <LastDescription>
              아파티로 이웃들과 더 친해질 수 있어요!
            </LastDescription>
          </LastDescriptionWrapper>
          <LastDescriptionImageContainer>
            <LastDescriptionImageWrapper>
              <LastDescriptionImage src="\img\apaty.gif"></LastDescriptionImage>
            </LastDescriptionImageWrapper>
          </LastDescriptionImageContainer>
        </LastSection>
        <ServiceButtonWrapper>
          <ButtonCustom onClick={handleButtonCustomClick}>
            A : PATY 시작하기
          </ButtonCustom>
        </ServiceButtonWrapper>
        <DeveloperSection>
          A : PATY Developer
          <StackCustom direction="row" spacing={2}>
            {developerList.map((developer) => {
              return (
                <Tooltip
                  key={developer.name}
                  title={developer.name}
                  sx={{ fontFamily: 'MinSans-Regular' }}
                >
                  <a href={developer.href} target="_blank" rel="noreferrer">
                    <Avatar
                      css={avatar}
                      alt={developer.name}
                      src={developer.img}
                    />
                  </a>
                </Tooltip>
              );
            })}
          </StackCustom>
        </DeveloperSection>
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
  line-height: 140%;
  margin-top: 5.125rem;
`;

const PhoneFrameContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

const FindFamilyContainer = styled.div`
  opacity: 1;
  transform: none;
  position: relative;
  width: 18rem;
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
  /* width: 19.625em; */
  width: 100%;
  /* filter: brightness(1.1); */
`;

const FindFamilyWrapper = styled.div`
  position: absolute;
  top: -3.625em;
  right: 0px;
  z-index: 0;
  font-size: 0.59375rem;
`;

const FindFamilyAlert = styled.div`
  opacity: 1;
  transform: none;
  display: flex;
  flex-direction: row;
  padding: 1.5em;
  background: white;
  border-radius: 1.5em;
  box-shadow: rgb(0 0 0 / 6%) 0.125em 0.375em 1em 0.5em;
  width: 16.875em;
  margin-bottom: 1.25em;
`;

const FindFamilyAlertImg = styled.img`
  width: 100%;
`;

const FamilyList = styled.div`
  opacity: 1;
  transform: none;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  background: white;
  border-radius: 1.5em;
  box-shadow: rgb(0 0 0 / 6%) 0.125em 0.375em 1em 0.5em;
  width: 16.875em;
`;

const FamilyListImage = styled.img`
  /* height: 150px; */
  width: 100%
`;

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

const IntroductionAnswer = styled.div``;

const IntroductionAnswerH2 = styled.h2`
  font-family: 'MinSans-Bold';
  font-size: 18px;
  line-height: 140%;
`;

const ApartmentRoundedIconCustom = styled(ApartmentRoundedIcon)`
  width: 24px;
  height: 24px;
`;

const IntroductionText = styled.div`
  margin-left: 0.25rem;
`;

const Section = styled.div`
  display: flex;
  margin: 0px auto;
  flex-direction: column;
  text-align: center;
  padding: 3.5rem 1.625rem;
  background-color: #ffe9d3;
`;

const AdvantageDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AdvantageDescriptionOne = styled.div`
  line-height: 140%;
`;

const AdvantageDescriptionOneH3 = styled.h3`
  font-family: 'MinSans-Regular';
  font-size: 16px;
  line-height: 120%;
`;

const AdvantageDescriptionOneStrong = styled.strong`
  font-family: 'Yeongdo-Rg';
  font-size: 20px;
  color: #ffb2a9;
`;

const AdvantageIconContainer = styled.div`
  display: grid;
  grid-template-columns: max-content;
  gap: 0.625rem 0rem;
  margin-top: 1rem;
  margin-bottom: 2.25rem;
`;

const AdvantageIconWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  column-gap: 0.3125rem;
`;

const LastSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 3.5rem 2.25rem;
`;
const LastDescriptionTitle = styled.h2`
  font-size: 20px;
  font-family: 'MinSans-Bold';
  margin-bottom: 1.75rem;
`;

const LastDescriptionWrapper = styled.div`
  text-align: center;
`;

const LastDescription = styled.p`
  font-size: 16px;
  font-family: 'MinSans-Regular';
`;

const AdvantageSpan = styled.span`
  opacity: 0.6;
  align-items: center;
`;

const LastDescriptionImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 288px;
  height: 302px;
`;

const LastDescriptionImageWrapper = styled.div`
  max-width: 800px;
  display: block;
`;

const LastDescriptionImage = styled.img`
  max-width: 100%;
  display: block;
  position: static;
  bottom: 0;
  height: 100%;
  left: 0;
  margin: 0;
  max-width: none;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  object-fit: cover;
`;

const DeveloperSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 1.5rem 1.25rem;
`;

const StackCustom = styled(Stack)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const avatar = css`
  width: 50px;
  height: 50px;
`;
const backgroundpurple = css`
  background-color: #e4d2ee;
`;

const purple = css`
  color: #cd99e9;
`;

const purpleborder = css`
  border: 0.5em solid #cd99e9;
  margin: 0;
`;

const iconCustom = css`
  font-size: 18px;
`;

export default Main;
