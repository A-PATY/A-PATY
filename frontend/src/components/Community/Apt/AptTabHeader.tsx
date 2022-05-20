/** @jsxImportSource @emotion/react */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const AptTabHeader: React.FC<Props> = ({ value, handleChange }) => {
  const navigate = useNavigate();
  function a11yProps(index: number) {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Container>
        <Grid
          container
          spacing={0}
          sx={{ height: '70px', alignContent: 'center' }}
        >
          {/* <GridIcon item xs={1}>
            <ArrowBackIosRoundedIconCustom onClick={() => navigate(-1)} />
          </GridIcon> */}
          <GridText item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '90%' }}>
              <TabsCustom
                value={value}
                onChange={handleChange}
                textColor="inherit"
                aria-label="basic tabs example"
              >
                <Tab
                  label="전체 소통"
                  {...a11yProps(0)}
                  sx={{ width: '50%' }}
                />
                <Tab
                  label="익명 소통"
                  {...a11yProps(1)}
                  sx={{ width: '50%' }}
                />
              </TabsCustom>
            </Box>
          </GridText>
        </Grid>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: white;
  font-size: 18px;
  height: 70px;
  text-align: center;
  box-shadow: rgb(0 0 0 / 15%) 0px 15px 15px -15px;
  position: sticky;
  top: 0px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GridIcon = styled(Grid)`
  text-align: left;
`;

const ArrowBackIosRoundedIconCustom = styled(ArrowBackIosRoundedIcon)`
  cursor: pointer;
  margin: 5px 0px 0px 8px;
`;

const GridText = styled(Grid)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabsCustom = styled(Tabs)`
  & .MuiButtonBase-root {
    font-family: 'MinSans-Regular';
    font-size: 18px;
    // color: #bae6e5;
    // color: #95e3e1;
  }

  & .MuiTabs-indicator {
    background-color: #bae6e5;
  }
`;

export default AptTabHeader;
