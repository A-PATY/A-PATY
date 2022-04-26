import styled from '@emotion/styled';
import { Box, Avatar } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ArticleComments from './Comments';

const LogInMain: React.FC = () => {
  return (
    <>
      <Section>
        <Wrapper>
          <ArticleHead>
            <Category>
              <Link href="">지역</Link>
              <ArrowBackIosRoundedIconCustom></ArrowBackIosRoundedIconCustom>
              <Link href="">일상</Link>
            </Category>
            <Title>이런거 받을 때 뿌듯</Title>
            <AuthorBox>
              <AvatarCustom alt="profile" src="" />
              <Name>리치몬드</Name>
            </AuthorBox>
            <WrapInfo>
              <InfoSpan><AccessTimeIcon/>작성일</InfoSpan>
              <InfoSpan><VisibilityOutlinedIcon/>600</InfoSpan>
              <InfoSpan><ChatBubbleOutlineIcon/>23</InfoSpan>
              <InfoFunction>
                <EditOutlinedIcon/>
                <DeleteOutlinedIcon/>
              </InfoFunction>
            </WrapInfo>
          </ArticleHead>
          <ArticleContent>
            <ContentArea>작성 내용 들어가는 부분</ContentArea>
            <ImageContainer>
              {/* 추후 map 사용 */}
              <Image src="https://t1.daumcdn.net/cfile/blog/991625335E6089F302" alt="image"></Image>
            </ImageContainer>
            <ArticleInfo>
              <Buttons><ThumbUpOutlinedIcon/>1</Buttons>
              <Buttons><ChatBubbleOutlineIcon/>30</Buttons>
            </ArticleInfo>
          </ArticleContent>
          <ArticleComments/>
        </Wrapper>
      </Section>
    </>
  );
};

const Section = styled.section`
  color: #222;
  font-size: 14px;
  line-height: 1.25em;
  word-wrap: break-word;
  cursor: default;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const ArticleHead = styled.div`
  z-index: 1;
  padding: 25px 20px 19px;
`;

const Category = styled.h1`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
`;

const Link = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const ArrowBackIosRoundedIconCustom = styled(ArrowBackIosRoundedIcon)`
  width: 12px;
  height: 12px;
  margin: -2px 4px 0;
  vertical-align: middle;
  transform: scaleX(-1);
`;

const Title = styled.h2`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
`;

const AuthorBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const AvatarCustom = styled(Avatar)`
  margin: 16px 10px 0 0;
  width: 30px;
  height: 30px;
`;

const Name = styled.p`
  margin-top: 16px;
  font-size: 12px;
  line-height: 16px;
`;

const WrapInfo = styled.div`
  margin-top: 16px;
  font-size: 12px;
  position: relative;
`;

const InfoSpan = styled.span`
  margin-right: 16px;
  color: #94969b;
  vertical-align: top;
  & .MuiSvgIcon-root {
    width: 16px;
    height: 16px;
    margin: -1px 3px 1px 0;
    vertical-align: middle;
  }
`;

const InfoFunction = styled.div`
  position: absolute;
  right: 0;
  top: -2px;
  & .MuiSvgIcon-root {
    width: 16px;
    height: 16px;
    margin: -1px 10px 1px 0;
    vertical-align: middle;
    cursor: pointer;
    color: #3c3c3c;
  }
`;

const ContentArea = styled.p`
  margin-top: 24px;
  line-height: 1.6em;
  font-size: 15px;
`;

const ArticleContent = styled.div`
  padding: 0 20px;
  border-top: 1px solid #eee;
  word-wrap: break-word;
  word-break: break-word;
`;

const ImageContainer = styled.p`
  line-height: 1.75em;
  font-size: 16px;
  position: relative;
  display: inline-block;
  margin-top: 24px;
`;

const Image = styled.img`
  width: 100%;
`;

const ArticleInfo = styled.div`
  position: relative;
  margin-top: 30px;
  padding: 20px 0;
  border-top: 1px solid #eee;
`;

const Buttons = styled.a`
  position: relative;
  margin-right: 17px;
  padding-left: 24px;
  font-size: 14px;
  line-height: 20px;
  vertical-align: top;
  text-decoration: none;
  color: #222;
  cursor: pointer;
  & .MuiSvgIcon-root {
    position: absolute;
    top: 59%;
    left: 0;
    width: 16px;
    height: 16px;
    margin-top: -9px;
  }
`;

export default LogInMain;
