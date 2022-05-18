import { useEffect, useState } from 'react';
import FamilyService from '../../services/FamilyService';
import FamilyMember from './FamilyMember';
import { familyList, location } from '../../types/familyTypes';
import { UserInfo } from '../../types/loginTypes';
import styled from '@emotion/styled';
import Slider from '@mui/material/Slider';
import { motion } from 'framer-motion';
import { firestore } from '../../firebase';
import { getDoc, updateDoc, doc, onSnapshot, setDoc, addDoc } from 'firebase/firestore';
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
  // const [familyId, setFamilyId] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<familyList>({
    userId: 0,  
    nickname: "",
    profileImgUrl: "",
    findFamily: true
  });

  const [memberLocation, setMemberLocation] = useState<location>({ lat: 0, lng: 0 });
  // const [aptLocation, setAptLocation] = useState<location>(aptLocate); 
  // const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 });
  
  const { kakao } = window as any;
  
  useEffect(() => {
    FamilyService.getFamilyList()
      .then((data) => {
        const family = data.familyList;
        // setFamilyId(data.familyId);
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

        // 도로명 주소 사용 
        const docRef = doc(firestore, "families", data.familyId);
        // getDoc(docRef).then(res => {
        //   findAptLocation(res.get('doroJuso'));
        // });
        
        getDoc(docRef).then(res => {
          // console.log('index 확인!!!')
          const index = marks.findIndex((mark) => mark.range === res.get('range'));
          // console.log("인덱스 확인",index)
          setRange(marks[index].range);
        });
      })
  }, []);

  useEffect(() => {
    getMemberData();
  }, [selectedMember]);

  // 지도상의 좌표 변화
  useEffect(() => {
    if (aptLocate && memberLocation) {
      if (memberLocation.lat !== 0 && memberLocation.lng !== 0) {
        mapLocation(aptLocate.lat, aptLocate.lng, range);
      }
    }
  }, [memberLocation, range, aptLocate]);  
  
  const mapLocation = (aptlat: number, aptlng: number, inputRange: number) => {
    // console.log('현재 멤버는?', memberLocation.lat, memberLocation.lng)
    if (selectedMember.userId) {  // memberLocation.lat !== 0 && memberLocation.lng !== 0
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
  
      // 마커 표시 위치
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
          // marker.setMap(map);
          const customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: markerPosition,
            content: content,
            yAnchor: 1 
          });
        };
  
        map.setCenter(member);
      } else {
        map.setCenter(center);  // ----
      };
  
      circle.setMap(map);
    } 
  };

  // firebase 불러오기
  const getMemberData = () => {
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      const member = selectedMember.userId;
      // console.log('getMemberData의 member', member)
      onSnapshot(docRef, (document) => { 
        console.log('snapshot 빈도')
        const user = document.get(member.toString());
        if (user && (memberLocation.lat !== user.lat || memberLocation.lng !== user.lng)) {
          console.log('memberLocation 저장 빈도')
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
      {/* <MapContainer id="map"/>
      <motion.div 
        drag="y"
        dragConstraints={{ top: 0, bottom: 180 }}
        style={{ zIndex: "1", marginTop: "calc(100vh - 340px)" }}
        dragElastic={0}
      >
        <FamilyListContainer>
          <Tab />
          <Head>
            <Title>가족들</Title>
            <SliderCustom
              defaultValue={range}
              valueLabelFormat={valueLabelFormat}
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Head>
          {familyList.map((member) => {
            return (
              <FamilyMember
                key={member.userId}
                member={member}
                changeMember={changeMember}
              />
            );
          })}
        </FamilyListContainer>
      </motion.div> */}
      <MapContainer id="map">
        
      </MapContainer>
      <FamilyListContainer style={{ bottom: isUp ? "0" : "-27%"}}>
        <Tab onClick={slide}/>
        <Head>
          <Title>가족들</Title>
          {/* <SliderCustom
            defaultValue={30}
            valueLabelFormat={valueLabelFormat}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
          /> */}
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
  /* height: 200px; */
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

// const SliderCustom = styled(Slider)`
//   width: 100px;
//   margin-top: 20px;
//   color: #dfc5ed;
//   & .MuiSlider-thumb {
//     width: 17px;
//     height: 17px;
//   };
//   & .MuiSlider-thumb:hover {
//     box-shadow: 0 0 0 8px #f4f1f580;
//   };
//   & .Mui-focusVisible {
//     /* box-shadow: 0 0 0 8px #f4f1f580; */
//     box-shadow: none;
//   };
//   & .MuiSlider-markLabel {
//     color: transparent;
//   };
// `;

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
