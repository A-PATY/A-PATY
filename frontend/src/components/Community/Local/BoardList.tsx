import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Board from './Board';
import CategoryChips from './CategoryChips';

interface Props {
  categoryId: number;
  setCategoryId: (value: number) => void;
  data: any;
  fetchNextPage: () => void;
  hasNextPage: any;
  isFetching: any;
  isFetchingNextPage: any;
}

const BoardList: React.FC<Props> = ({
  categoryId,
  setCategoryId,
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
}) => {
  return (
    <>
      <CategoryChipsWrapper>
        <CategoryChips categoryId={categoryId} setCategoryId={setCategoryId} />
      </CategoryChipsWrapper>
      <BoxCustom>
        <Container>
          <Board
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetching={isFetching}
            isFetchingNextPage={isFetchingNextPage}
          />
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
