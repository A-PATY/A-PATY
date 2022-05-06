/** @jsxImportSource @emotion/react */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { useNavigate } from 'react-router-dom';

const LocalHeader: React.FC = () => {
  const navigate = useNavigate();
  const writeArticle = () => {
    navigate('/board/write');
  };
  return (
    <>
      <Container>
        <Grid container spacing={0}>
          <GridText item xs={3}>
            <Text>장미동</Text>
          </GridText>
          <Grid item xs={5.5}></Grid>
          <GridCustom item xs={3}>
            <TransparentBtn>
              <SearchRoundedIcon />
            </TransparentBtn>
            <TransparentBtn onClick={writeArticle}>
              <CreateRoundedIcon />
            </TransparentBtn>
            <TransparentBtn>
              <NotificationsActiveRoundedIcon />
            </TransparentBtn>
          </GridCustom>
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

const GridText = styled(Grid)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridCustom = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-right: 5px;
  }
`;
const Text = styled.p``;

const TransparentBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
export default LocalHeader;
