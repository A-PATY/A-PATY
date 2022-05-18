import { useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import { comment } from '../../types/boardTypes';
import BoardService from '../../services/BoardService';
import { useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LockIcon from '@mui/icons-material/Lock';
import { Article } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';
import { presentCommunityTypeState } from '../../features/Board/atom';
import { presentArticleState } from '../../features/Board/atom';

interface CommentProps {
  comment: comment;
  deleteComment: (commentId: number) => void;
}

interface CommentsProps {
  artielcId: string;
  comments: comment[] | undefined;
  commentCount: number | undefined;
  fetchArticle: () => void;
}

// 개별 댓글
const Comment: React.FC<CommentProps> = ({ comment, deleteComment }) => {
  const userInfo = useRecoilValue(userInfoState);
  const presentCommunityType = useRecoilValue(presentCommunityTypeState);
  console.log('presentCommunityType');
  console.log(presentCommunityType);
  const articleAuthor = useRecoilValue(presentArticleState)?.authorId;

  const authorName =
    presentCommunityType === 3
      ? comment.commentAuthor[0] + '*'.repeat(comment.commentAuthor.length - 1)
      : comment.commentAuthor;

  const calculateTime = (time: string) => {
    const today = new Date();
    const timeValue = new Date(time);
    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );

    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return time;
  };
  return (
    <CommentSection>
      <Author>
        <AvatarCustom src={comment.profileImgUrl} alt="profile" />
        <AuthorName>{authorName}</AuthorName>
        {comment.secret === true && <LockIconCustom></LockIconCustom>}
        {userInfo?.userId === comment.commentAuthorId && (
          <Delete onClick={() => deleteComment(comment.commentId)}></Delete>
        )}
      </Author>
      {comment.secret === false ||
      userInfo?.userId === comment.commentAuthorId ||
      userInfo?.userId === articleAuthor ? (
        <Content>{comment.commentContent}</Content>
      ) : (
        <Content>비밀 댓글입니다.</Content>
      )}

      <Time>{calculateTime(comment.commentCreatedAt)}</Time>
    </CommentSection>
  );
};

const Comments: React.FC<CommentsProps> = ({
  artielcId,
  comments,
  commentCount,
  fetchArticle,
}) => {
  const navigate = useNavigate();

  const [isSecret, setIsSecret] = useState(false); // 비밀댓글 여부
  const [content, setContent] = useState('');

  const handleSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    setIsSecret(event.target.checked);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setContent(event.target.value);
  };

  const onSubmit = () => {
    const comment = {
      contents: content,
      secret: isSecret,
    };
    BoardService.createComment(artielcId, comment)
      .then(() => {
        // 현재 글 상세페이지 업데이트
        setContent('');
        fetchArticle();
        // navigate(`/board/${artielcId}`);
      })
      .catch((err) => console.log(err));
  };

  const deleteComment = (commentId: number) => {
    console.log('삭제');
    console.log(commentId);
    BoardService.deleteComment(artielcId, String(commentId))
      .then(() => {
        // 현재 글 상세페이지 업데이트
        fetchArticle();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container>
        {/* <CommentsHead>댓글 {commentCount}</CommentsHead> */}
        {comments?.map((comment) => (
          <Comment
            key={comment.commentId}
            comment={comment}
            deleteComment={deleteComment}
          />
        ))}
        <WriteComment>
          <FormControlLabelCustom
            control={
              <Checkbox
                defaultChecked
                size="small"
                color="default"
                checked={isSecret}
                onChange={handleSecretChange}
              />
            }
            label="비밀"
            sx={{ fontSize: '13px' }}
          />
          <Input
            type="text"
            placeholder="댓글을 남겨주세요"
            maxLength={100}
            value={content}
            onChange={handleContentChange}
          ></Input>
          <IconCustom onClick={onSubmit} />
        </WriteComment>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0 0 -1px;
  // padding: 23px 0 24px;
  // border-top: 1px solid #eee;
`;

const CommentsHead = styled.h3`
  padding: 0 20px 20px;
  font-size: 14px;
  font-weight: 700;
`;

const CommentSection = styled.article`
  padding: 15px 15px 0 15px;
  border-top: 1px solid #e3e3e3;
`;

const Author = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const AvatarCustom = styled(Avatar)`
  width: 30px;
  height: 30px;
`;

const AuthorName = styled.h3`
  max-width: 120px;
  margin-left: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  font-weight: bold;
  color: #292929;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.p`
  line-height: 20px;
  color: #444444;
  font-size: 14px;
  padding-bottom: 5px;
  word-break: break-all;
`;

const Time = styled.p`
  margin-bottom: 5px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: #a6a6a6;
  letter-spacing: 0;
`;

const Delete = styled(DeleteOutlinedIcon)`
  position: absolute;
  right: 0;
  padding: 0 2px;
  height: 20px;
  line-height: 20px;
  color: #a6a6a6;
  font-size: 18px;
  cursor: pointer;
`;

const LockIconCustom = styled(LockIcon)`
  padding-left: 5px;
  color: #a6a6a6;
  font-size: 18px;
`;

const LockDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

const WriteComment = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: #f8f8f8;
  height: 40px;
  padding: 0 10px;
  margin: 15px 5px 0;
`;

const FormControlLabelCustom = styled(FormControlLabel)`
  margin: 0;
  span {
    padding: 5px 0;
    font-size: 13px;
    color: #f88e83;
  }
  & .MuiTypography-root {
    padding: 0 4px;
  }
`;

const Input = styled.input`
  margin: 0;
  padding: 10px 0px 10px 10px;
  border: 0;
  width: 80%;
  height: 40px;
  line-height: 20px;
  box-sizing: border-box;
  color: #262626;
  font-size: 13px;
  background-color: transparent;
`;

const IconCustom = styled(SendIcon)`
  color: #ffb2a9;
  cursor: pointer;
`;

export default Comments;
