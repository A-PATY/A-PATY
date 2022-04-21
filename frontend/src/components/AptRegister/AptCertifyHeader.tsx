import styled from '@emotion/styled';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Contents>
            <Back>
              <Icon></Icon>
            </Back>
            <HeaderTitle>
              <Title>고지서 인증</Title>
            </HeaderTitle>
          </Contents>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
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

const Contents = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const Back = styled.div`
  box-sizing: border-box;
  margin: 0px;
  flex-direction: row;
  flex-basis: 25%;
  -webkit-box-flex: 0;
  flex-grow: 0;
  max-width: 25%;
  text-align: left;
`;

const Icon = styled(ArrowBackIosNewIcon)`
  user-select: none;
  width: 0.8em;
  height: 0.8em;
  display: inline-block;
  fill: currentcolor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.5rem;
  margin: 5px 0px 0px 8px;
`;

const HeaderTitle = styled.div`
  box-sizing: border-box;
  margin: 0px;
  flex-direction: row;
  flex-basis: 50%;
  -webkit-box-flex: 0;
  flex-grow: 0;
  max-width: 50%;
  text-align: center;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const Title = styled.p`
  color: #ffb2a9;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: bold;
`;

export default Header;
