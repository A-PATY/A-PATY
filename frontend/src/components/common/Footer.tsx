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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Footer: React.FC = () => {
  const [value, setValue] = React.useState(-1);

  let navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate('/');
    } else if (value === 1) {
      navigate('/local_community');
    } else if (value === 2) {
      navigate('/apt_register');
    } else if (value === 3) {
      navigate('/find_family');
    } else if (value === 4) {
      navigate('/my-page');
    }
  }, [value]);

  return (
    <BottomNavigationCustom
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationActionCustom
        label="메인"
        icon={<SentimentSatisfiedAltRoundedIcon />}
      />
      <BottomNavigationActionCustom
        label="지역"
        icon={<HomeWorkRoundedIcon />}
      />
      <BottomNavigationActionCustom
        label="아파트"
        icon={<ApartmentRoundedIcon />}
      />
      <BottomNavigationActionCustom
        label="가족찾기"
        icon={<PersonSearchRoundedIcon />}
      />
      <BottomNavigationActionCustom
        label="내 정보"
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

const BottomNavigationActionCustom = styled(BottomNavigationAction)`
  &.Mui-selected {
    color: #ffb2a9;
  }
`;

export default Footer;
