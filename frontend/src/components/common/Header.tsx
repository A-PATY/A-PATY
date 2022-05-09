/** @jsxImportSource @emotion/react */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from 'react-router-dom';

interface Props {
  header: string;
}

const Header: React.FC<Props> = ({ header }) => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Grid container spacing={0}>
          <GridIcon item xs={3}>
            <ArrowBackIosRoundedIconCustom onClick={() => navigate(-1)} />
          </GridIcon>
          <GridText item xs={6}>
            <Text>{header}</Text>
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
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 10px;
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
  margin: 5px 0px 0px 8px;
`;

const GridText = styled(Grid)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p``;
export default Header;
