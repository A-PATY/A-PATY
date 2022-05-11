import * as React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';

interface ChipData {
  key: number;
  label: string;
}

interface Props {
  categoryId: number;

  setCategoryId: (value: number) => void;
}

const CategoryChips: React.FC<Props> = ({ categoryId, setCategoryId }) => {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: '전체' },
    { key: 1, label: '일상' },
    { key: 2, label: '정보' },
    { key: 3, label: '나눔장터' },
    { key: 4, label: '헬프' },
    { key: 5, label: '육아' },
    { key: 6, label: '공구' },
    { key: 7, label: '후기' },
  ]);

  const handleCategoryClick = (categoryId: number) => {
    console.log('categoryId');
    console.log(categoryId);
    setCategoryId(categoryId);
  };

  return (
    <PaperCustom
      sx={{
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'nowrap',
        listStyle: 'none',
        padding: 0.5,
        margin: 0,
        overflow: 'auto',
      }}
    >
      {chipData.map((data) => {
        return (
          <ListItem
            key={data.key}
            onClick={() => handleCategoryClick(data.key)}
          >
            <Chip
              label={data.label}
              style={
                data.key === categoryId
                  ? {
                      background: '#e4d2ee',
                      fontWeight: 'bold',
                      // boxShadow: '2px 2px 5px 1px grey',
                    }
                  : {}
              }
            />
          </ListItem>
        );
      })}
    </PaperCustom>
  );
};

const PaperCustom = styled(Paper)`
  margin-top: 5px;
  margin-bottom: 5px;
  -ms-overflow-style: none;
  background-color: transparent;
  border: none;
  box-shadow: none;
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

const ListItem = styled.li`
  margin: 3px;
  cursor: pointer;
`;

export default CategoryChips;
