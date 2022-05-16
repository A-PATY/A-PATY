import { useEffect, useState } from 'react';
import FamilyService from '../../services/FamilyService';
import FamilyMember from './FamilyMember';
import { familyList, location } from '../../types/familyTypes';
import { UserInfo } from '../../types/loginTypes';
import styled from '@emotion/styled';
import Slider from '@mui/material/Slider';
import { motion } from 'framer-motion';
import { firestore } from '../../firebase';
import { getDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../features/Login/atom';

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
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState);
  
  const [range, setRange] = useState<number>(100);
  const [familyList, setFamilyList] = useState<familyList[]>([]); 
  const [familyId, setFamilyId] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<familyList>({
    userId: 0,  
    nickname: "",
    profileImgUrl: "",
    findFamily: true
  });

  const [memberLocation, setMemberLocation] = useState<location>({ lat: 0, lng: 0 });
  const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 });  // 아파트 위치 => 지도 center 위치
  
  const { kakao } = window as any;
  
  useEffect(() => {
    FamilyService.getFamilyList()
      .then((data) => {
        const family = data.familyList;
        console.log(data.familyList);
        setFamilyId(data.familyId);
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
        getDoc(docRef).then(res => {
          findAptLocation(res.get('doroJuso'));
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          console.log('가입된 아파트가 없습니다');
        } else if (err.response.status === 500) {
          console.log('가족을 찾을 수 없습니다');
        }
      });
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.watchPosition(success, () => {},{ enableHighAccuracy: true });
  }, [familyId]);

  useEffect(() => {
    getMemberData();
  }, [selectedMember]);

  // 지도상의 좌표 변화
  useEffect(() => {
    if (memberLocation.lat !== 0 && memberLocation.lng !== 0) {
      // console.log(memberLocation.lat, memberLocation.lng)
      mapLocation(aptLocation.lat, aptLocation.lng);
    }
  }, [memberLocation, range]);  
  

  const valueLabelFormat = (value: number) => {
    const index = marks.findIndex((mark) => mark.value === value);
    setRange(marks[index].range);

    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  const mapLocation = (aptlat: number, aptlng: number) => {
    const container = document.getElementById('map');
    const center = new kakao.maps.LatLng(aptlat, aptlng);

    // 추가
    // console.log('멤버 위치', memberLocation.lat, memberLocation.lng)
    const member = new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng);
    
    const options = {  
      center: member,
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const circle = new kakao.maps.Circle({ 
      center: center,
      radius: range,
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
    const imgurl = selectedMember.profileImgUrl 
    const content = '<div class="customoverlay" style="position: relative">' + 
    '<div style="z-index: 1; position: absolute; bottom: -1px; left: -10px; width: 0px; height: 0px; border-top: 20px solid #fff; border-left: 10px solid transparent; border-right: 10px solid transparent; box-shadow: 0 5px 5px -5px gray;"></div>' + 
    '<img src="' + imgurl + '" alt="profile" style="position: absolute; bottom: 8px; left: -23px; z-index: 2; width: 45px; border-radius: 40px; object-fit: fill;"/>'+
    '</div>';

    if (distance <= range) {
      if (memberLocation.lat && memberLocation.lng) {
        // marker.setMap(map);
        const customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: markerPosition,
          content: content,
          yAnchor: 1 
        });
      };
      map.setCenter(member)
    } else {
      map.setCenter(center);  // ----
    }

    circle.setMap(map);
  };

  const findAptLocation = (address: string) => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    geocoder.addressSearch(address, (result: any, status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        setAptLocation({
          lat: result[0].y,
          lng: result[0].x,
        });
        mapLocation(result[0].y, result[0].x); // 추후 확인!
      }
    });
  };

  // firebase 불러오기
  const getMemberData = async () => {
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      const member = selectedMember.userId;

      onSnapshot(docRef, (document) => { 
        const user = document.get(member.toString());
        
        if (memberLocation.lat !== user.lat || memberLocation.lng !== user.lng) {
          setMemberLocation({ 
            lat: user.lat, 
            lng: user.lng 
          });
        }
      });
    }
  };

  // geolocation 콜백함수 + firebase 좌표 등록
  const success = (position: any) => {
    const { latitude, longitude } = position.coords;
    console.log('내 위치',latitude, longitude)
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      if (userInfo !== null) {
        updateDoc(docRef, {
          [userInfo.userId]: {  
            lat: latitude,
            lng: longitude
          }
        });
      }
    }
  };

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => { 
    const deg2rad = (deg: number) => deg * (Math.PI/180);
    const R = 6371; // 지구 반지름
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
  };

  const changeMember = (member: familyList) => {
    if (member.findFamily) setSelectedMember(member);
  };

  return (
    <>
      <MapContainer id="map"/>
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
              defaultValue={33}
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
      </motion.div>
    </>
  );
};

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const FamilyListContainer = styled.div`
  position: relative;
  background-color: #fff;
  height: 200px;
  width: 100%;
  border-radius: 20px 20px 0 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Tab = styled.div`
  background-color: lightgray;
  border-radius: 10px;
  width: 40px;
  height: 4px;
  text-align: center;
  margin: 10px auto 0;
  cursor: grab;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
`;

const Title = styled.h3`
  font-size: 20px;
  height: 20px;
  font-weight: 600;
`;
 
const SliderCustom = styled(Slider)`
  width: 100px;
  margin-top: 20px;
  color: #dfc5ed;
  & .MuiSlider-thumb {
    width: 17px;
    height: 17px;
  }
  & .MuiSlider-thumb.Mui-focusVisible {
    box-shadow: 0 0 0 8px #f4f1f580;
  }
  & .MuiSlider-thumb:hover {
    box-shadow: 0 0 0 8px #f4f1f580;
  }
  & .Mui-focusVisible {
    box-shadow: none;
  }
  & .MuiSlider-markLabel {
    color: transparent;
  }
`;

export default FindFamily;
