import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { memberProps } from '../../types/familyTypes';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOffIcon from '@mui/icons-material/LocationOff';

import { db } from '../../firebase';
import { ref, get, child, onChildChanged, onValue } from 'firebase/database';

const FamilyMember: React.FC<memberProps> = ({ member, changeMember }) => {
  const statusRef = ref(db, `/status/${member.userId}`);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    onValue(child(statusRef, 'state'), snapshot => {
      if (snapshot.exists()) {
        checkConnection(snapshot.val());
      } else {
        console.log("No data available");
      };
    });
  }, []);

  const checkConnection = (value: string) => {
    if (value === 'online') {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    };
  };

  return (
    <>
      <Container>
        {
          isConnected ? 
          <OnlineBadge 
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <AvatarCustom 
              src={member.profileImgUrl} 
              alt={member.nickname} 
              onClick={() => {changeMember(member)}}
              style={{ cursor: member.findFamily ? "pointer" : "default" }}
            />
          </OnlineBadge> :
          <OfflineBadge 
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <AvatarCustom 
              src={member.profileImgUrl} 
              alt={member.nickname} 
              onClick={() => {changeMember(member)}}
              style={{ cursor: member.findFamily ? "pointer" : "default" }}
            />
          </OfflineBadge>
        }
        <MemberInfo 
          onClick={() => {changeMember(member)}} 
          style={{ cursor: member.findFamily ? "pointer" : "default" }}
        >
          <MemberName>{member.nickname}</MemberName>
          {
            member.findFamily ?
            <LocationOnIcon style={{ color: "#ffb2a9" }}/> :
            <Tooltip 
              title="위치찾기 미허용" 
              placement="top"
              componentsProps={{ 
                tooltip: { 
                  sx: {
                    backgroundColor: "#eae7e7",
                    color: 'rgba(0, 0, 0, 0.87)',
                    fontSize: 11,
                    padding: "5px 6px",
                  }
                }
              }}
            >
              <LocationOffIcon style={{ color: "#9e9d9d" }}/>
            </Tooltip>
          }
        </MemberInfo>
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
`;

const OnlineBadge = styled(Badge)`
  & .MuiBadge-badge::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    content: '""';
  }
  & .MuiBadge-badge {
    background-color: #44b700;
    color: #44b700;
    box-shadow: 0 0 0 1px #43b70049;
    bottom: 21%;
    min-width: 10px;
    height: 10px
  }
`;

const OfflineBadge = styled(Badge)`
  & .MuiBadge-badge::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    content: '""';
  }
  & .MuiBadge-badge {
    background-color: gray;
    color: gray;
    box-shadow: 0 0 0 1px lightgray;
    bottom: 21%;
    min-width: 10px;
    height: 10px
  }
`;

const MemberInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & .MuiSvgIcon-root {
    font-size: 20px;
    margin-left: 5px;
  }
`;

const MemberName = styled.h3`
  max-width: 120px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #292929;
  white-space: nowrap;
`;

export default FamilyMember;
