import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { memberProps } from '../../types/familyTypes';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOffIcon from '@mui/icons-material/LocationOff';

const FamilyMember: React.FC<memberProps> = ({ member, changeMember }) => {
  return (
    <>
      <Container>
        <AvatarCustom 
          src={member.profileImgUrl} 
          alt={member.userName} 
          onClick={() => {changeMember(member)}}
          style={{ cursor: member.findFamily ? "pointer" : "default" }}
        />
        <MemberInfo 
          onClick={() => {changeMember(member)}} 
          style={{ cursor: member.findFamily ? "pointer" : "default" }}
        >
          <MemberName>{member.userName}</MemberName>
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

const MemberName = styled.h3`
  max-width: 120px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #292929;
  white-space: nowrap;
`;

const MemberInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  & .MuiSvgIcon-root {
    font-size: 20px;
    /* color: #9e9d9d; */
    margin-left: 5px;
  }
`;

export default FamilyMember;
