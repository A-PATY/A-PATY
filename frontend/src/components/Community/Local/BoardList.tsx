import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Board from './Board';
import CategoryChips from './CategoryChips';

const BoardList: React.FC = () => {
  return (
    <>
      <CategoryChipsWrapper>
        <CategoryChips />
      </CategoryChipsWrapper>
      <BoxCustom>
        <Container>
          <Board />
        </Container>
      </BoxCustom>
    </>
  );
};

const CategoryChipsWrapper = styled(Box)`
  height: 50px;
`;

const BoxCustom = styled(Box)`
  overflow-y: auto;
  height: calc((100% - 70px) - 50px);

  &::-webkit-scrollbar {
    display: none;
  }
  &.box {
    -ms-overflow-style: none;
  }
  &.box::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1 1 auto;
  overflow-y: auto;
`;

export default BoardList;
