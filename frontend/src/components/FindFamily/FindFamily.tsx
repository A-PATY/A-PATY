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
    label: '1',
    range: 100,
  },
  {
    value: 66,
    label: '2',
    range: 200,
  },
  {
    value: 100,
    label: '3',
    range: 400,
  },
];

const FindFamily: React.FC = () => {
  const userInfo = useRecoilValue<UserInfo | null>(userInfoState);
  
  const [range, setRange] = useState<number>(100);
  const [familyList, setFamilyList] = useState<familyList[]>([]); 
  // const [familyAddress, setFamilyAddress] = useState<string>("");
  const [familyId, setFamilyId] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<familyList>({
    userId: 0,  
    userName: "",
    profileImgUrl: "",
    findFamily: true
  });

  const [memberLocation, setMemberLocation] = useState<location>({ lat: 0, lng: 0 })
  const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 });  // 아파트 위치 => 지도 center 위치
  
  const { kakao } = window as any;
  
  useEffect(() => {
    FamilyService.getFamilyList()
      .then((data) => {
        const family = data.familyList;

        setFamilyId(data.familyId);
        setFamilyList(data.familyList);
        // getMemberData();
        // setFamilyAddress(data.familyAddress); 
        // findAptLocation(data.familyAddress);
        
        if (userInfo !== null) {
          for (let i = 0; i < family.length; i++) {
            if (family[i].userId === userInfo.userId) {
              setSelectedMember({ 
                userId: userInfo.userId,
                userName: userInfo.nickName,
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
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.watchPosition(success);
  }, [familyId]);

  useEffect(() => {
    getMemberData();
  }, [selectedMember]);

  // 지도상의 좌표 변화
  useEffect(() => {
    mapLocation(aptLocation.lat, aptLocation.lng);
  }, [memberLocation, range]);  
  

  const valueLabelFormat = (value: number) => {
    const index = marks.findIndex((mark) => mark.value === value);
    setRange(marks[index].range);

    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  const mapLocation = (aptlat: number, aptlng: number) => {
    const container = document.getElementById('map');
    const center = new kakao.maps.LatLng(aptlat, aptlng)
    const options = {  
      center: center,
      level: 3 
    };

    const map = new kakao.maps.Map(container, options); 

    const circle = new kakao.maps.Circle({ 
      center: center,
      radius: range, 
      strokeWeight: 0, 
      fillColor: '#dfc5ed', 
      fillOpacity: 0.3 
    });

    // 마커 표시 
    let markerPosition  = new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    const distance = Math.round(getDistance(memberLocation.lat, memberLocation.lng, aptlat, aptlng));
    
    // 커스텀 컨텐트
    // const content = '<div class="customoverlay">' + 
    // '<img src="http://www.urbanbrush.net/web/wp-content/uploads/edd/2017/11/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7-2017-11-02-%EC%98%A4%EC%A0%84-10.11.55.png" alt="profile" style="z-index: 1; width:50px; border-radius: 30px;"/>'+
    // '</div>';

    // 커스텀 오버레이가 표시될 위치입니다 
    const position = new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng);  

    if (distance <= range) {
      marker.setMap(map);
      // const customOverlay = new kakao.maps.CustomOverlay({
      //   map: map,
      //   position: position,
      //   content: content,
      //   yAnchor: 1 
      // });
    };
    map.setCenter(center);
    circle.setMap(map); 
  };

  const findAptLocation = (address: string) => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    geocoder.addressSearch(address, (result: any, status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        setAptLocation({
          lat: result[0].y,
          lng: result[0].x
        });
        mapLocation(result[0].y, result[0].x);  // 추후 확인!
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
    const dLat = deg2rad(lat2-lat1); 
    const dLon = deg2rad(lng2-lng1); 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c * 1000
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
        style={{ zIndex: "1", marginTop: "90%" }}
        dragElastic={0}
      >
        <FamilyListContainer>
          <Tab/>
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
          {
            familyList.map((member) => {
              return (
                <FamilyMember key={member.userId} member={member} changeMember={changeMember}/>
              )
            })
          }
        </FamilyListContainer>
      </motion.div>
    </>
  );
};

const CustomOverlay = styled.div`
  position:relative;
  bottom:85px;
  border-radius:6px;
  border: 1px solid #ccc;
  border-bottom:2px solid #ddd;
  float:left;
`;
// .customoverlay:nth-of-type(n) {border:0; box-shadow:0px 1px 2px #888;}
// .customoverlay a {display:block;text-decoration:none;color:#000;text-align:center;border-radius:6px;font-size:14px;font-weight:bold;overflow:hidden;background: #d95050;background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;}
// .customoverlay .title {display:block;text-align:center;background:#fff;margin-right:35px;padding:10px 15px;font-size:14px;font-weight:bold;}
// .customoverlay:after {content:'';position:absolute;margin-left:-12px;left:50%;bottom:-12px;width:22px;height:12px;background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}


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
  };
  & .MuiSlider-thumb.Mui-focusVisible {
    box-shadow: 0 0 0 8px #f4f1f580;
  };
  & .MuiSlider-thumb:hover {
    box-shadow: 0 0 0 8px #f4f1f580;
  };
  & .Mui-focusVisible {
    box-shadow: none;
  };
  & .MuiSlider-markLabel {
    color: transparent;
  };
`;

export default FindFamily;