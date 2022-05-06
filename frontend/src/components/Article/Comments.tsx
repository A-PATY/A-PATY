import { useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import { comment } from '../../types/boardTypes';

interface CommentProps {
  comment: {
    profileImgUrl: string;
    commentAuthor: string;
    commentContent: string;
    commentCreatedAt: string;
  };
}

interface CommentsProps {
  comments: comment[];
  commentCount: number;
}

// 개별 댓글
const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <CommentSection>
      <Author>
        <AvatarCustom src={comment.profileImgUrl} alt="profile" />
        <AuthorName>{comment.commentAuthor}</AuthorName>
        <Delete>삭제</Delete>
      </Author>
      <Content>{comment.commentContent}</Content>
      <Time>{comment.commentCreatedAt}</Time>
    </CommentSection>
  );
};

const Comments: React.FC<CommentsProps> = ({ comments, commentCount }) => {
  const [checked, setChecked] = useState(true); // 비밀댓글 여부

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // 임시 댓글
  // const comments = [
  //   {
  //     commentId: 1,
  //     commentContent: '댓글 내용',
  //     commentCreatedAt: "2022-04-15 15:03",
  //     secret: false,
  //     commentAuthor: "101동 102호 흑장미",
  //     profileImgUrl: "https://...askalfi21k333kejf"
  //   }
  // ];

  return (
    <>
      <Container>
        <CommentsHead>댓글 {commentCount}</CommentsHead>
        {comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
        <WriteComment>
          <FormControlLabelCustom
            control={
              <Checkbox
                defaultChecked
                size="small"
                color="default"
                onChange={handleChange}
              />
            }
            label="비밀"
            sx={{ fontSize: '13px' }}
          />
          <Input type="text" placeholder="댓글을 남겨주세요"></Input>
          <IconCustom />
        </WriteComment>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0 0 -1px;
  padding: 23px 0 24px;
  border-top: 1px solid #eee;
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

const Delete = styled.a`
  position: absolute;
  right: 0;
  padding: 0 2px;
  height: 20px;
  line-height: 20px;
  color: #a6a6a6;
  font-size: 12px;
  cursor: pointer;
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
