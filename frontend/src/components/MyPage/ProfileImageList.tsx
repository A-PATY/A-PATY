import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  setProfileImgId: (value: number) => void;
}
const itemData = [
  {
    img: '\\img\\image0.svg',
    title: 'Breakfast',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Burger',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Camera',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Coffee',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Hats',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Honey',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Basketball',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Fern',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Mushrooms',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Tomato basil',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Sea star',
  },
  {
    img: '\\img\\image0.svg',
    title: 'Bike',
  },
];

const ProfileImageList: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
  setProfileImgId,
}) => {
  const handleClose = () => {};
  return (
    <>
      <DialogCustom onClose={handleClose} open={open}>
        <DialogTitleWrapper>
          <DialogTitle>프로필 선택</DialogTitle>
        </DialogTitleWrapper>
        <BoxCustom>
          <ImageListCustom
            sx={{ width: 500, height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.title}>
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageListCustom>
        </BoxCustom>
      </DialogCustom>
    </>
  );
};

const DialogCustom = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 30px;
  }
`;

const DialogTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoxCustom = styled(Box)`
  padding: 12px 24px 24px;
  overflow-y: auto;
`;

const ImageListCustom = styled(ImageList)`
  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
export default ProfileImageList;
