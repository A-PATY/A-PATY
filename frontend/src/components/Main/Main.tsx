import styled from '@emotion/styled';

const Main: React.FC = () => {
  return (
    <>
      <FirstSection>
        <Container></Container>
      </FirstSection>
    </>
  );
};

const FirstSection = styled.section`
  background: #fbf7f2;
  height: 582px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  overflow: visible;
  align-items: center;
`;
export default Main;
