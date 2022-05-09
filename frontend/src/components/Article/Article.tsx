import React from 'react';
import { useParams } from 'react-router-dom';
import { article } from '../../types/boardTypes';
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
import BoardService from '../../services/BoardService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogInMain: React.FC = () => {
  // const [articleId, setArticleId] = React.useState(0)
  const navigate = useNavigate();

  const [article, setArticle] = React.useState<article>({
    articleId: 0,
    category: '',
    title: '',
    contents: '',
    imgs: null,
    contact: null,
    isDone: false,
    views: 0,
    likes: 0,
    isLike: true,
    createdAt: '',
    commentCount: 0,
    author: '',
    profileImgUrl: '',
    commentsList: [],
  });
  const { article_id } = useParams<{ article_id: string }>();
  // console.log(useParams());

  const fetchArticle = React.useCallback(async () => {
    await BoardService.getArticle(article_id)
      .then((res) => {
        console.log(res);
        setArticle(res.data);
      })
      .catch((err) => {
        if (err.response) {
          const { status, message } = err.response.data;

          switch (status) {
            case 400:
              alert(message);
              break;
            case 500:
              alert(message);
              break;
          }
        }
      });
  }, [article_id]);

  React.useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  const editArticle = () => {
    navigate(`/board/${article.articleId}/edit`, {
      state: { article: article },
    });
  };

  const deleteArticle = () => {
    Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: '글을 삭제하면 되돌릴 수 없습니다',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        BoardService.deleteArticle(article_id)
          .then(() => {
            navigate(`/local_community`);
          })
          .catch((err) => console.log(err.response));
      }
    });
  };

  return (
    <>
      <Section>
        <Wrapper>
          <ArticleHead>
            <Category>
              <Link href="">지역</Link>
              <ArrowBackIosRoundedIconCustom></ArrowBackIosRoundedIconCustom>
              <Link href="">{article?.category}</Link>
            </Category>
            <Title>{article?.title}</Title>
            <AuthorBox>
              <AvatarCustom alt="profile" src="" />
              <Name>{article?.author}</Name>
            </AuthorBox>
            <WrapInfo>
              <InfoSpan>
                <AccessTimeIcon />
                {article?.createdAt}
              </InfoSpan>
              <InfoSpan>
                <VisibilityOutlinedIcon />
                {article?.views}
              </InfoSpan>
              <InfoSpan>
                <ChatBubbleOutlineIcon />
                {article?.commentCount}
              </InfoSpan>
              <InfoFunction>
                <EditOutlinedIcon onClick={editArticle} />
                <DeleteOutlinedIcon onClick={deleteArticle} />
              </InfoFunction>
            </WrapInfo>
          </ArticleHead>
          <ArticleContent>
            <ContentArea>{article?.contents}</ContentArea>
            <ImageContainer>
              {/* 추후 map 사용 */}
              {article?.imgs?.map((img) => (
                <Image key={img.imgId} src={img.src} alt="image"></Image>
              ))}
            </ImageContainer>
            <ArticleInfo>
              <Buttons>
                <ThumbUpOutlinedIcon />
                {article?.likes}
              </Buttons>
              <Buttons>
                <ChatBubbleOutlineIcon />
                {article?.commentCount}
              </Buttons>
            </ArticleInfo>
          </ArticleContent>
          <ArticleComments
            artielcId={String(article?.articleId)}
            comments={article?.commentsList}
            commentCount={article?.commentCount}
          />
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
