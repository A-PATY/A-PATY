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
  const userId = useRecoilValue(updatedUser);
  const setCategoryList = useSetRecoilState(categoryListState);
  const userInfo = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const accessToken = axiosInstance.defaults.headers.common['Authorization'];
  const refreshToken = getCookie('apaty_refresh');

  const [familyList, setFamilyList] = useState<familyList[]>([]);
  const familyId = userInfo?.aptId.toString() + '-' + userInfo?.dong + '-' + userInfo?.ho;
  const [userLocation, setUserLocation] = useState<location>({
    lat: 0,
    lng: 0,
  });
  const [range, setRange] = useState<number>(100);
  const [aptLocation, setAptLocation] = useState<location>({ lat: 0, lng: 0 }); // 아파트 위치 => 지도 center 위치
  const setAptLocationState = useSetRecoilState(aptLocationState);
  const [beforeUser, setBeforeUser] = useState({ lat: 0, lng: 0 });

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
          maxAge: 60 * 60 * 24 * 5,
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

  useEffect(() => {
    if (userId && userInfo?.aptName) {
      FamilyService.getFamilyList()
      .then(data => {
        const family = data.familyList;
        setFamilyList(family);
        
        const docRef = doc(firestore, "families", family);
        getDoc(docRef).then(res => {
          findAptLocation(res.get('doroJuso'));
        });
      })
      .catch(err => console.log(err));
    }
  }, [userId]); 

  useEffect(() => {
    if (familyId) {
      const docRef = doc(firestore, "families", familyId);
      onSnapshot(docRef, (document) => { 
        setRange(document.get('range'));
      });
    }
  }, [familyId]);

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.watchPosition(success, () => {}, { timeout: Infinity });
  }, [familyId, range]);

  useEffect(() => {
    if (userLocation.lat !== 0 && userLocation.lng !== 0) {
      mapLocation(aptLocation.lat, aptLocation.lng);
    }
  }, [userLocation, range]);

  const success = (position: any) => {
    if (familyId) {
      const { latitude, longitude } = position.coords;
      const docRef = doc(firestore, "families", familyId);
      
      if (userInfo !== null) {
        getDoc(docRef).then(res => {
          if (res.exists()) {
            const loc = res.get(userInfo?.userId.toString());
            const distance = getDistance(latitude, longitude, loc.lat, loc.lng);
            
            if (distance > 10) {
              updateDoc(docRef, {
                [userInfo.userId]: {
                  lat: latitude,
                  lng: longitude,
                },
              });
  
              setUserLocation({
                lat: latitude,
                lng: longitude,
              });
  
              setBeforeUser({
                lat: loc.lat,
                lng: loc.lng
              });
            }
          }
        });
      }
    }
  };
  
  // map으로 범위 확인
  const { kakao } = window as any;

  const mapLocation = (aptlat: number, aptlng: number) => {
    const distance = Math.round(getDistance(userLocation.lat, userLocation.lng, aptlat, aptlng));
    const beforeDistance = Math.round(getDistance(beforeUser.lat, beforeUser.lng, aptlat, aptlng));
    const nowPos = distance - range;
    const beforePos = beforeDistance - range;

    for (let member of familyList) {
      if (userInfo?.userId && member.userId !== userInfo?.userId) {
        const notifyRef = doc(firestore, `notifications`, member.userId.toString());
        const time = new Date();
        
        getDoc(notifyRef).then((data) => {
          if (data.exists()) {
            if (nowPos > 0 && beforePos < 0) {
              updateDoc(notifyRef, { 
                [time.toString()] : {
                  userId : userInfo?.userId,
                  time: time,
                  nickname: userInfo?.nickname,
                  content: "아파트 단지에서 벗어났습니다."
                }
              });
            } else if (nowPos < 0 && beforePos > 0) { 
              updateDoc(notifyRef, { 
                [time.toString()] : {
                  userId : userInfo?.userId,
                  time: time,
                  nickname: userInfo?.nickname,
                  content: "아파트 단지에 들어왔습니다."
                }
              });
            };
          } else {
            if (nowPos > 0 && beforePos < 0) {  
              setDoc(notifyRef, { 
                [time.toString()] : {
                  userId : userInfo?.userId,
                  time: time,
                  nickname: userInfo?.nickname,
                  content: "아파트 단지에서 벗어났습니다."
                }
              });
            } else if (nowPos < 0 && beforePos > 0) { 
              setDoc(notifyRef, { 
                [time.toString()] : {
                  userId : userInfo?.userId,
                  time: time,
                  nickname: userInfo?.nickname,
                  content: "아파트 단지에 들어왔습니다."
                }
              });
            }
          };
        });    
      }
    };
  };

  // 아파트 좌표 등록하기 (처음에)
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
        });
        mapLocation(result[0].y, result[0].x); 
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
