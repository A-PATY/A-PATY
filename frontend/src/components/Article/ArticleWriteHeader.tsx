/** @jsxImportSource @emotion/react */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import Button from '@mui/material/Button';
interface Props {
  header: string;
}

const Header: React.FC<Props> = ({ header }) => {
  return (
    <>
      <Container>
        <GridCustom container spacing={0}>
          <GridIcon item xs={1}>
            <ArrowBackIosRoundedIconCustom />
          </GridIcon>
          <GridText item xs={7}>
            <Text>{header}</Text>
          </GridText>
          <GridButtonWrapper item xs={3}>
            <ButtonCustom>완료</ButtonCustom>
          </GridButtonWrapper>
        </GridCustom>
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
  align-items: center;
  justify-content: center;
`;

const GridCustom = styled(Grid)`
  align-items: center;
  justify-content: center;
`;
const GridIcon = styled(Grid)`
  text-align: left;
`;

const ArrowBackIosRoundedIconCustom = styled(ArrowBackIosRoundedIcon)`
  margin: 5px 0px 0px 8px;
`;

const GridText = styled(Grid)`
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const GridButtonWrapper = styled(Grid)`
  text-align: left;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Text = styled.p``;

const ButtonCustom = styled(Button)`
  font-family: 'MinSans-Regular';
  font-size: 17px;
  color: #bae6e5;
`;
export default Header;
