import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import FamilyList from './FamilyMember';
import Slider from '@mui/material/Slider';
import { css, keyframes } from '@emotion/react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, setDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import FamilyService from '../../services/FamilyService';
import { familyList, location } from '../../types/familyTypes';

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
  const [isSlided, setIsSlided] = useState<boolean>(false);
  const [range, setRange] = useState<number>(100);

  const [familyList, setFamilyList] = useState<familyList[]>([]); 
  const [familyAddress, setFamilyAddress] = useState<string>("");
  const [familyId, setFamilyId] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<familyList>({
    userId: 0,
    userName: "",
    profileImgUrl: "",
    findFamily: false
  });
  const [memberLocation, setMemberLocation] = useState<location>({ lat: 0, lng: 0 })
  const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 });  // 아파트 위치 => 지도 center 위치
  
  const userId = '5'; // 임시 데이터 => recoil 사용하기 

  const { kakao } = window as any;

  useEffect(() => {
    FamilyService.getFamilyList()
      .then((data) => {
        setFamilyId(data.familyId);
        setFamilyAddress(data.familyAddress);
        setFamilyList(data.familyList);
        setSelectedMember({  // 초기값 recoil
          userId: 5,
          userName: "장미",
          profileImgUrl: "../img/image0.svg",
          findFamily: false
        })
        
        findAptLocation(data.familyAddress);
      })
      .then(() => {
        getMemberData();
        const docRef = doc(db, "families", familyId);
        getDoc(docRef).then(res => {
          // setFamilyAddress(res.data()['doroJuso'])
          const document = res.data();
          console.log(res.data())
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
    const container = document.getElementById('map');
    const options = {  
      center: new kakao.maps.LatLng(aptLocation.lat, aptLocation.lng),
      level: 3 
    };

    const map = new kakao.maps.Map(container, options); 

    // 반경 확인
    const circle = new kakao.maps.Circle({ 
      center : new kakao.maps.LatLng(aptLocation.lat, aptLocation.lng), 
      radius: range, 
      strokeWeight: 0, 
      fillColor: '#dfc5ed', 
      fillOpacity: 0.3 
    });

    // 마커 표시 위치 
    let markerPosition  = new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    const coords = new kakao.maps.LatLng(aptLocation.lat, aptLocation.lng);
    const distance = Math.round(getDistance(memberLocation.lat, memberLocation.lng, aptLocation.lat, aptLocation.lng));
    
    if (distance <= range) marker.setMap(map);
    map.setCenter(coords);
    circle.setMap(map); 
    
  }, [memberLocation, range]);  
  

  const valueLabelFormat = (value: number) => {
    const index = marks.findIndex((mark) => mark.value === value);
    setRange(marks[index].range);
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  const findAptLocation = (address: string) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any, status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        setAptLocation({
          lat: result[0].y,
          lng: result[0].x
        });
      } 
    });    
  };

  // firebase 불러오기 
  const getMemberData = async () => {
    if (familyId) {
      const docRef = doc(db, "families", familyId);
      const member = selectedMember.userId;

      const unsub = onSnapshot(docRef, (document) => { 
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
  
  // geolocation 콜백함수 + firebase에 나의 좌표 등록하기 
  const success = (position: any) => {
    const { latitude, longitude } = position.coords;

    if (familyId) {
      const docRef = doc(db, "families", familyId);
      updateDoc(docRef, {
        [userId]: {  
          lat: latitude,
          lng: longitude
        }
      });
    }
  };

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => { 
    const deg2rad = (deg: number) => { 
      return deg * (Math.PI/180) 
    };
    const R = 6371; // 지구 반지름
    const dLat = deg2rad(lat2-lat1); 
    const dLon = deg2rad(lng2-lng1); 
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c * 1000
  };
    
  // 가족 변화
  const changeMember = (member: familyList) => {
    setSelectedMember(member);
  };

  // 가족 목록 slider 처리
  const slide = () => {
    setIsSlided(!isSlided);
  };

  return (
    <>
      <MapContainer id="map">

      </MapContainer>
      <FamilyListContainer>
        <Tab onClick={slide}/>
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
              <FamilyList key={member.userId} member={member} changeMember={changeMember}/>
            )
          })
        }
      </FamilyListContainer>
    </>
  );
};

const slide = keyframes`
  from{
    bottom: -30%;
  }
  to{
    bottom: 0px;
  }
`;

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
  /* animation: ${slide} 0.4s; */
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

const Tab = styled.div`
  background-color: lightgray;
  border-radius: 10px;
  width: 40px;
  height: 4px;
  text-align: center;
  margin: 10px auto 0;
  cursor: pointer;
`;

export default FindFamily;