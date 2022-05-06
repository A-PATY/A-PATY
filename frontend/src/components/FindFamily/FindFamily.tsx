import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import FamilyList from './FamilyMember';
import Slider from '@mui/material/Slider';
import { css, keyframes } from '@emotion/react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";
import FamilyService from '../../services/FamilyService';
import { familyList, location } from '../../types/familyTypes';

const marks = [
  {
    value: 33,
    label: '1',
  },
  {
    value: 66,
    label: '2',
  },
  {
    value: 100,
    label: '3',
  },
];

function valueLabelFormat(value: number) {
  return marks.findIndex((mark) => mark.value === value) + 1;
};


const FindFamily: React.FC = () => {
  const [isSlided, setIsSlided] = useState<boolean>(false);

  const [familyList, setFamilyList] = useState<familyList[]>([]); 
  const [familyAddress, setFamilyAddress] = useState<string>("") 
  const [familyId, setFamilyId] = useState<string>("");
  
  const [selectedMember, setSelectedMember] = useState<familyList>({
    userId: 0,
    userName: "장미",
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
          profileImgUrl: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9zZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          findFamily: false
        })
        
        // firebase
        // getMemberData(data.familyId);
      })
      .then(() => {
        getMemberData();
      })
      .catch(err => console.log(err));
    
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;
    // console.log('location 확인')
    geolocation.watchPosition(success);
  }, [familyId]);

  // 선택한 가족 바뀔 때 
  useEffect(() => {
    getMemberData();
  }, [selectedMember]);

  // 지도상의 좌표 변화
  useEffect(() => {
    changeLocation();
  }, [memberLocation]);  
  

  // firebase 불러오기 
  const getMemberData = async () => {
    if (familyId) {
      const docRef = doc(db, "families", familyId);
      const member = selectedMember.userId
      const unsub = onSnapshot(docRef, (document) => { 
        // console.log('firebase에서 가져온 값', document.get(member.toString()));
  
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
    console.log('나의 위치: ', latitude, longitude);
    
    if (familyId) {
      const docRef = doc(db, "families", familyId);
      console.log('업데이트 진행!!')
      updateDoc(docRef, {
        [userId]: {  
          lat: latitude,
          lng: longitude
        }
      });
    }
  };

  // 지도상 좌표 변화 
  const changeLocation = () => {
    const container = document.getElementById('map');
    const options = {  // 지도 생성 기본 옵션
      center: new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng),
      level: 3 
    };

    const map = new kakao.maps.Map(container, options); 

    const imageSrc = selectedMember.profileImgUrl; // 마커이미지의 주소입니다    
    const imageSize = new kakao.maps.Size(64, 69); // 마커이미지의 크기입니다
    const imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커 표시 위치 
    let markerPosition  = new kakao.maps.LatLng(memberLocation.lat, memberLocation.lng); 
    
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      // image: markerImage
    });

    marker.setMap(map);
    map.panTo(markerPosition);
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
            defaultValue={30}
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
  & .MuiSlider-thumb:hover {
    box-shadow: 0 0 0 8px #f4f1f580;
  };
  & .Mui-focusVisible {
    /* box-shadow: 0 0 0 8px #f4f1f580; */
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
