import { useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { memberProps } from '../../types/familyTypes';

const FamilyMember: React.FC<memberProps> = ({ member, changeMember }) => {
  
  return (
    <>
      <Container>
        <AvatarCustom 
          src={member.profileImgUrl} 
          alt={member.userName} 
          onClick={() => {changeMember(member)}}
        />
        <AuthorName onClick={() => {changeMember(member)}}>{member.userName}</AuthorName>
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
