import { Global } from '@emotion/react';
import resetStyles from './styles/resetStyles';
import commonStyles from './styles/commonStyles';

import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import LogInPage from './pages/LogInPage';
import AptRegisterPage from './pages/AptRegisterPage';
import MyPage from './pages/MyPage';
import LocalCommunityPage from './pages/LocalCommunityPage';
import AptCommunityPage from './pages/AptCommunityPage';
import ArticlePage from './pages/ArticlePage';
import FindFamilyPage from './pages/FindFamilyPage';
import ArticleWritePage from './pages/ArticleWritePage';
import ArticleEditPage from './pages/ArticleEditPage';
import KakaoCallbackPage from './pages/KakaoCallbackPage';
import NewMemberPage from './pages/NewMemberPage';
import NotificationPage from './pages/NotificationPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminPage from './pages/AdminPage';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState, updatedUser } from './features/Login/atom';
import { getCookie, setCookie } from './hooks/Cookie';
import { axiosInstance } from './utils/axios';

import UserService from './services/UserService';
import BoardService from './services/BoardService';
import FamilyService from './services/FamilyService';
import { categoryListState } from './features/Board/atom';

import { db, firestore } from './firebase';
import { ref, set, onValue, onDisconnect } from 'firebase/database';
import { getDoc, updateDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { familyList, location } from './types/familyTypes';

import { getDistance } from './utils/getDistance';
import { aptLocationState } from './features/Family/atom';
import Swal from 'sweetalert2';


const App: React.FC = () => {
  // 확인!!! -------------
  const userId = useRecoilValue(updatedUser);
  const setCategoryList = useSetRecoilState(categoryListState);
  const userInfo = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const accessToken = axiosInstance.defaults.headers.common['Authorization'];
  const refreshToken = getCookie('apaty_refresh');

  useEffect(() => {
    if (userInfo === null && getCookie('apaty_refresh') !== undefined) {
      axiosInstance.defaults.headers.common[
        'RefreshToken'
      ] = `Bearer ${refreshToken}`;
      UserService.getNewToken().then(({ accessToken, refreshToken }) => {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        setCookie('apaty_refresh', refreshToken, {
          maxAge: 60 * 5,
          path: '/',
        });
        BoardService.getCategoryList().then(({ categoryList }) => {
          // console.log('categoryList : ');
          // console.log(categoryList);
          setCategoryList(categoryList);
        });
        UserService.getUserInfo().then(({ userInfo }) => {
          setUserInfo(userInfo);
        });
      });
    }

    if (userInfo === null && accessToken !== undefined) {
      //악성 유저 처리
      Swal.fire({
        title: '회원 정보가 제대로 입력되지 않았습니다.',
        text: '탈퇴 후 재가입하여 서비스 이용해주세요.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.replace('/');
    }

    // if (refreshToken === undefined && window.location.pathname !== '/') {
    //   Swal.fire({
    //     title: '로그인 후 서비스 이용해주세요.',
    //     icon: 'success',
    //     showConfirmButton: false,
    //     timer: 2000,
    //   });
    //   window.location.replace('/');
    // }
  }, []);

  useEffect(() => {
    const connectRef = ref(db, '.info/connected');

    onValue(connectRef, (snapshot) => {
      if (snapshot.val() === true && userInfo?.userId) {
        set(ref(db, `/status/${userInfo?.userId}`), {
          state: 'online',
          nickname: userInfo?.nickname,
        });
      }
      onDisconnect(ref(db, `/status/${userInfo?.userId}/state`)).set('offline');
    });
  }, [userId]);



  // ---------- 위치 추가 app단에서 진행하기 
  const [familyList, setFamilyList] = useState<familyList[]>([]); 
  // const [familyId, setFamilyId] = useState<string>("");
  const familyId = userInfo?.aptId.toString() + "-" + userInfo?.dong + "-" + userInfo?.ho
  const [userLocation, setUserLocation] = useState<location>({ lat: 0, lng: 0 });
  const [range, setRange] = useState<number>(100);
  const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 });  // 아파트 위치 => 지도 center 위치
  const setAptLocationState = useSetRecoilState(aptLocationState);
  
  useEffect(() => {
    if (userId) {
      FamilyService.getFamilyList()
      .then((data) => {
        console.log('가족 목록 가져오기')
        // console.log(data);
        const family = data.familyList;
        // setFamilyId(data.familyId);
        setFamilyList(data.familyList);
        
        const docRef = doc(firestore, "families", data.familyId);
        getDoc(docRef).then(res => {
          findAptLocation(res.get('doroJuso'));
        });
      })
      .catch(err => {
        console.log('가져오지 못함!!!!!!')
      })
    }
  }, [userId]);  // ------------- [] 배열 확인하기

  useEffect(() => {
    // range 받아오기
    // const docRef = doc(firestore, "families", data.familyId);
    // getDoc(docRef).then(res => {
    //   setRange(res.get('range'));
    // });
    
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      onSnapshot(docRef, (document) => { 
        setRange(document.get('range'))
        console.log('범위확인', document.get('range'))
      });
    }  
  }, [familyId]);

  // 내 위치 저장하기
  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.watchPosition(success, () => {}, { timeout: 10000 });  // enableHighAccuracy: true,
    // if (userId) {  // ----- 움직이면서 확인 필요
    
    // }
  }, [familyId]);


  useEffect(() => {
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      console.log('app에서의 range 확인여부')
      mapLocation(aptLocation.lat, aptLocation.lng);
    }
  }, [userLocation, range]);  

  const success = (position: any) => {
    const { latitude, longitude } = position.coords;
    console.log('내 위치', latitude, longitude)
    // console.log(familyId)
    // console.log('위치확인시점의 가족아이디',familyId)
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      if (userInfo !== null) {
        getDoc(docRef).then((res) => {
          const loc = res.get(userInfo?.userId.toString());
          const dist = getDistance(latitude, longitude, loc.lat, loc.lng);
          // console.log(dist)
          if (dist > 5) {
            updateDoc(docRef, {
              [userInfo.userId]: {  
                lat: latitude,
                lng: longitude
              }
            });
    
            setUserLocation({
              lat: latitude,
              lng: longitude
            })
          }
        })
        
      }
    }
  };
  // const { geolocation } = navigator;
  // geolocation.watchPosition(success, () => {}, { enableHighAccuracy: true, timeout: 10000 });

  // map으로 범위만 확인하기
  const { kakao } = window as any;
  const [rangeIn, setRangeIn] = useState<boolean>(false);
  const [rangeOut, setRangeOut] = useState<boolean>(false);

  const mapLocation = (aptlat: number, aptlng: number) => {
    const distance = Math.round(getDistance(userLocation.lat, userLocation.lng, aptlat, aptlng));

    if (distance <= range) {
      // console.log('범위 안입니다!!!!')
      if (userLocation.lat && userLocation.lng) {
        ///------------------------- 알림에 집어넣기 => 벗어나서 1번 넣으면 다시 넣지 않아야 함... (알림 무한반복 문제)
        // 그리고 위치 허용한 사람의 경우에만 밑의 과정을 실행할 것
        // 범위를 설정할 것(고정값 store에 저장) 
        console.log('가족리스트', familyList)
        for (let member of familyList) {
          console.log(userInfo?.userId)
          if (userInfo?.userId && member.userId !== userInfo?.userId) {
            const notifyRef = doc(firestore, `notifications`, member.userId.toString())
            console.log('App에서 알림 넣음!!!')
            
            updateDoc(notifyRef, { 
              [userInfo?.userId] : {
                time: new Date(),
                nickname: userInfo?.nickname,
                content: "아파트 단지에 들어왔습니다."
              }
            })
          }
        };
      };
    } else {

    }
  };

  const findAptLocation = (address: string) => {
    const geocoder = new kakao.maps.services.Geocoder();
    
    geocoder.addressSearch(address, (result: any, status: string) => {
      if (status === kakao.maps.services.Status.OK) {
        setAptLocation({
          lat: result[0].y,
          lng: result[0].x,
        });
        setAptLocationState({
          lat: result[0].y,
          lng: result[0].x,
        })
        mapLocation(result[0].y, result[0].x); // 추후 확인!
      }
    });
  };

  return (
    <>
      <Global styles={resetStyles} />
      <Global styles={commonStyles} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/apt_register" element={<AptRegisterPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/local_community" element={<LocalCommunityPage />} />
          <Route path="/apt_community" element={<AptCommunityPage />} />
          <Route path="/board/:article_id" element={<ArticlePage />} />
          <Route path="/oauth/callback/kakao" element={<KakaoCallbackPage />} />
          <Route path="/find_family" element={<FindFamilyPage />} />
          <Route path="/board/write" element={<ArticleWritePage />} />
          <Route path="/board/:article_id/edit" element={<ArticleEditPage />} />
          <Route path="/newMember" element={<NewMemberPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
