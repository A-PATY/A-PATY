import { useEffect, useState } from 'react';
import FamilyService from '../../services/FamilyService';
import FamilyMember from './FamilyMember';
import { familyList, location } from '../../types/familyTypes';
import { UserInfo } from '../../types/loginTypes';
import styled from '@emotion/styled';
import { firestore } from '../../firebase';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';

import { getDistance } from '../../utils/getDistance';
import { aptLocationState } from '../../features/Family/atom';

const marks = [
  {
    value: 33,
    label: '100m',
    range: 100,
  },
  {
    value: 66,
    label: '200m',
    range: 200,
  },
  {
    value: 100,
    label: '400m',
    range: 400,
  },
];

const FindFamily: React.FC = () => {
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState)!;
  const aptLocate = useRecoilValue<location | null>(aptLocationState)!;
  const familyId = userInfo?.aptId.toString() + "-" + userInfo?.dong + "-" + userInfo?.ho
  const [range, setRange] = useState<number>(100);
  const [familyList, setFamilyList] = useState<familyList[]>([]); 
  const [selectedMember, setSelectedMember] = useState<familyList>({
    userId: 0,  
    nickname: "",
    profileImgUrl: "",
    findFamily: true
  });
  const [memberLocation, setMemberLocation] = useState<location>({ lat: 0, lng: 0 });
  
  const { kakao } = window as any;
  
  useEffect(() => {
    FamilyService.getFamilyList()
      .then((data) => {
        const family = data.familyList;
        setFamilyList(data.familyList);

        if (userInfo !== null) {
          for (let i = 0; i < family.length; i++) {
            if (family[i].userId === userInfo.userId) {
              setSelectedMember({ 
                userId: userInfo.userId,
                nickname: family[i].nickname,
                profileImgUrl: family[i].profileImgUrl,
                findFamily: userInfo.findFamily
              });
              break;
            }
          }
        }

        const docRef = doc(firestore, "families", data.familyId);
        
        getDoc(docRef).then(res => {
          const index = marks.findIndex((mark) => mark.range === res.get('range'));
          setRange(marks[index].range);
        });
      })
  }, []);

  useEffect(() => {
    getMemberData();
  }, [selectedMember]);

  // ???????????? ?????? ??????
  useEffect(() => {
    if (aptLocate && memberLocation) {
      if (memberLocation.lat !== 0 && memberLocation.lng !== 0) {
        mapLocation(aptLocate.lat, aptLocate.lng, range);
      }
    }
  }, [memberLocation, range, aptLocate]);  
  
  const mapLocation = (aptlat: number, aptlng: number, inputRange: number) => {
    if (selectedMember.userId) { 
      const container = document.getElementById('map');
      const center = new kakao.maps.LatLng(aptlat, aptlng);
      const member = new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng);
      
      const options = {  
        center: member,
        level: 3,
      };
  
      const map = new kakao.maps.Map(container, options);
      const circle = new kakao.maps.Circle({ 
        center: center,
        radius: inputRange,
        strokeWeight: 0,
        fillColor: '#dfc5ed',
        fillOpacity: 0.3,
      });
  
      // ?????? ?????? ??????
      let markerPosition = new kakao.maps.LatLng(
        memberLocation.lat,
        memberLocation.lng,
      );
  
      const distance = Math.round(getDistance(memberLocation.lat, memberLocation.lng, aptlat, aptlng));
      const imgurl = selectedMember.profileImgUrl;
      const content = '<div class="customoverlay" style="position: relative">' + 
      '<div style="z-index: 1; position: absolute; bottom: -1px; left: -10px; width: 0px; height: 0px; border-top: 20px solid #fff; border-left: 10px solid transparent; border-right: 10px solid transparent; box-shadow: 0 5px 5px -5px gray;"></div>' + 
      '<img src="' + imgurl + '" alt="profile" style="position: absolute; bottom: 8px; left: -23px; z-index: 2; width: 45px; border-radius: 40px; object-fit: fill;"/>'+
      '</div>';
  
      if (distance <= range) {
        if (selectedMember.findFamily && memberLocation.lat && memberLocation.lng) {
          const customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: markerPosition,
            content: content,
            yAnchor: 1 
          });
        };
        map.setCenter(member);
      } else {
        map.setCenter(center);
      };
  
      circle.setMap(map);
    } 
  };

  // firebase ????????????
  const getMemberData = () => {
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      const member = selectedMember.userId;

      onSnapshot(docRef, (document) => { 
        const user = document.get(member.toString());
        
        if (user && (memberLocation.lat !== user.lat || memberLocation.lng !== user.lng)) {
          setMemberLocation({ 
            lat: user.lat, 
            lng: user.lng 
          });
        }
      });
    }
  };

  const changeMember = (member: familyList) => {
    if (member.findFamily) {
      setSelectedMember(member)
    };
  };

  const [isUp, setIsUp] = useState(true);
  const slide = () => {
    setIsUp(!isUp);
  };

  return (
    <>
      <MapContainer id="map">
        
      </MapContainer>
      <FamilyListContainer style={{ bottom: isUp ? "0" : "-27%"}}>
        <Tab onClick={slide}/>
        <Head>
          <Title>?????????</Title>
        </Head>
        {
          familyList.map((member) => {
            return (
              <FamilyMember key={member.userId} member={member} changeMember={changeMember}/>
            )
          })
        }
      </FamilyListContainer>
    </>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const FamilyListContainer = styled.div`
  position: absolute;
  background-color: #fff;
  height: 30%;
  bottom: 0px;
  width: 100%;
  z-index: 1;
  border-radius: 20px 20px 0 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
`;

const Title = styled.h3`
  font-size: 20px;
  height: 20px;
  font-weight: 600;
`;

const Tab = styled.div`
  background-color: lightgray;
  border-radius: 10px;
  width: 50px;
  height: 4px;
  text-align: center;
  margin: 10px auto 0;
  cursor: pointer;
`;
 
export default FindFamily;
