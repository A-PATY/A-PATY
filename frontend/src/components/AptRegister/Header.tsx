import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const MainHeader: React.FC = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Contents>
            <HomeLink to="/">아파트 커뮤니티 가입</HomeLink>
          </Contents>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Contents = styled.div`
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

const HomeLink = styled(Link)`
  display: inline-block;
  line-height: 0;
  color: #ffb2a9;
`;
export default MainHeader;
