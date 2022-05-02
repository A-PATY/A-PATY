import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import FamilyList from './FamilyMember';
import Slider from '@mui/material/Slider';
import { css, keyframes } from '@emotion/react'

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
  // const [familyList, setFamilyList] = useState([]); 
  const familyAddress = ""; 
  const familyId = "";  
  const [isSlided, setIsSlided] = useState(false);
  
  // 더미 데이터 
  const familyList = [
    {
      userId: 1,
      userName: "장미",
      findFamily: true,
      userProfileImgUrl: "https://...askalfi21k333kejf",
    },
    {
      userId: 2,
      userName: "선민",
      findFamily : true,
      userProfileImgUrl: "https://...askalfi21k333kejf",
    },
  ];

  const { kakao } = window as any;
  
  useEffect(() => {
    const container = document.getElementById('map');  //지도를 담을 영역의 DOM 레퍼런스
    const options = {  //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667),  //지도의 중심좌표.
      level: 3  //지도의 레벨(확대, 축소 정도)
    };

    const map = new kakao.maps.Map(container, options); 
  }, []);

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
              <FamilyList key={member.userId} member={member}/>
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
