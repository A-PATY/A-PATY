import { useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { memberProps } from '../../types/familyTypes';

const FamilyMember: React.FC<memberProps> = ({ member }) => {
  const [checked, setChecked] = useState(true);  // 비밀댓글 여부

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
  return (
    <>
      <Container>
        <AvatarCustom src={member.userProfileImgUrl} alt={member.userName}/>
        <AuthorName>{member.userName}</AuthorName>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0px 30px 30px;
  display: flex;
  align-items: center;
`;

const AvatarCustom = styled(Avatar)`
  width: 55px;
  height: 55px;
  cursor: pointer;
`;

const AuthorName = styled.h3`
  max-width: 120px;
  margin-left: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #292929;
  white-space: nowrap;
  cursor: pointer;
`;

export default FamilyMember;
