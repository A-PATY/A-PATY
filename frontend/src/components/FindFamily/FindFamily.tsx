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
  // const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 });
  const [aptLocation, setAptLocation] = useState<location>(aptLocate); 
  
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
          const index = marks.findIndex((mark) => mark.range === res.get('range'));
          setRange(marks[index].range);
        });
      })
  }, []);

  useEffect(() => {
    getMemberData();
  }, [selectedMember]);

  // 지도상의 좌표 변화
  useEffect(() => {
    if (memberLocation.lat !== 0 && memberLocation.lng !== 0) {
      mapLocation(aptLocation.lat, aptLocation.lng, range);
    }
  }, [memberLocation, range]);  
  

  const [rangeIn, setRangeIn] = useState<boolean>(false);
  const [rangeOut, setRangeOut] = useState<boolean>(false);
  const mapLocation = (aptlat: number, aptlng: number, inputRange: number) => {
    // console.log('현재 멤버는?', memberLocation.lat, memberLocation.lng)
    if (selectedMember.userId) {  // memberLocation.lat !== 0 && memberLocation.lng !== 0
      console.log('map')
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
        if (memberLocation.lat && memberLocation.lng) {
          // marker.setMap(map);
          const customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            position: markerPosition,
            content: content,
            yAnchor: 1 
          });
        };
        // 맞는 공식!!!!!!
        for (let member of familyList) {
            if (member.userId !== userInfo.userId) {
              // console.log("알림에 넣음")
              const notifyRef = doc(firestore, `notifications`, member.userId.toString())
              getDoc(notifyRef).then((data) => {
                const contents = data.get(userInfo?.userId.toString())
                console.log(userInfo?.userId)
                // console.log(data.get(userInfo?.userId.toString()).content)
                // 만약 이미 안에 들어가지 않은 경우라면, 넣어주기
                if (data.exists()) {
                  if (contents.content !== "아파트 단지에 들어왔습니다.") {
                    console.log("같지 않으면 넣음")
                    setDoc(notifyRef, {  //addDoc(notifyRef, {
                      [userInfo.userId] : {
                        time: new Date(),
                        nickname: userInfo.nickname,
                        content: "아파트 단지에 들어왔습니다."
                      }
                    });
                  }
                } else {
                  setDoc(notifyRef, {  //addDoc(notifyRef, {
                    [userInfo.userId] : {
                      time: new Date(),
                      nickname: userInfo.nickname,
                      content: "아파트 단지에 들어왔습니다."
                    }
                  });
                }
              })
              // setDoc(notifyRef, {  //addDoc(notifyRef, {
              //   [userInfo.userId] : {
              //     time: new Date(),
              //     nickname: userInfo.nickname,
              //     content: "아파트 단지에 들어왔습니다."
              //   }
              // })
              
            }
          }
        map.setCenter(member);
      } else {
        for (let member of familyList) {
          if (member.userId !== userInfo.userId) {
            // console.log(member.userId)
            const notifyRef = doc(firestore, `notifications`, member.userId.toString())
            setDoc(notifyRef, {  //addDoc(notifyRef, {
              // family : {
              //   [userInfo.userId] : {
              //     time: new Date(),
              //     nickname: userInfo.nickname
              //   }
              // }
              [userInfo.userId] : {
                time: new Date(),
                nickname: userInfo.nickname,
                content: "아파트 단지에서 벗어났습니다."
              }
            })
            
          }
        }
        map.setCenter(center);  // ----
      }
  
      circle.setMap(map);

    } else {

    }
  };

  // const findAptLocation = (address: string) => {
  //   const geocoder = new kakao.maps.services.Geocoder();
    
  //   geocoder.addressSearch(address, (result: any, status: string) => {
  //     const docRef = doc(firestore, "families", familyId);
  //     // const member = selectedMember.userId;
  //     const member = userInfo.userId

  //     getDoc(docRef).then(res => {
  //       const index = marks.findIndex((mark) => mark.range === res.get('range'));
  //       setRange(marks[index].range);
        
  //       if (status === kakao.maps.services.Status.OK) {
  //         setAptLocation({
  //           lat: result[0].y,
  //           lng: result[0].x,
  //         });
  //         mapLocation(result[0].y, result[0].x, marks[index].range); // 추후 확인!
  //       }
  //     })
      
  //   });
  // };

  // firebase 불러오기
  const getMemberData = () => {
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      const member = selectedMember.userId;
      // console.log('getMemberData의 member', member)
      onSnapshot(docRef, (document) => { 
        console.log('snapshot 빈도')
        const user = document.get(member.toString());
        if (user) {
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
            {/* <SliderCustom
              defaultValue={range}
              valueLabelFormat={valueLabelFormat}
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
            /> */}
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
  /* padding: 0 28px; */
  padding: 20px 28px;
`;

const Title = styled.h3`
  font-size: 20px;
  height: 20px;
  font-weight: 600;
`;
 
export default FindFamily;
