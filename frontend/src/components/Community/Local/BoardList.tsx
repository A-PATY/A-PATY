import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Board from './Board';
import CategoryChips from './CategoryChips';

const BoardList: React.FC = () => {
  return (
    <>
      <Box>
        <CategoryChips />
      </Box>
      <Container>
        <Board />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc((100% - 70px) - 70px);
  flex: 1 1 auto;
  overflow-y: auto;
`;

export default BoardList;
