import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import styled from '@emotion/styled';

const LogInFooter: React.FC = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigationCustom
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label="메인"
        icon={<SentimentSatisfiedAltRoundedIcon />}
      />
      <BottomNavigationAction label="지역" icon={<HomeWorkRoundedIcon />} />
      <BottomNavigationAction label="아파트" icon={<ApartmentRoundedIcon />} />
      <BottomNavigationAction
        label="가족찾기"
        icon={<PersonSearchRoundedIcon />}
      />
      <BottomNavigationAction
        label="마이페이지"
        icon={<AccountBoxRoundedIcon />}
      />
    </BottomNavigationCustom>
  );
};

const BottomNavigationCustom = styled(BottomNavigation)`
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0px;
  height: 70px;
  background-color: white;
`;

export default LogInFooter;
