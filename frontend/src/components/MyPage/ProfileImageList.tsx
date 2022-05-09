import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import useProfileImageList from '../../hooks/useProfileImageList';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  setProfileImgId: (value: number) => void;
  setProfileImgUrl: (value: string) => void;
}

const ProfileImageList: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
  setProfileImgId,
  setProfileImgUrl,
}) => {
  const handleImageListItemClick =
    (imgUrl: string) =>
    (id: number) =>
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setProfileImgId(id);
      setProfileImgUrl(imgUrl);
      onClose();
    };

  const itemData = useProfileImageList();

  return (
    <>
      <DialogCustom onClose={onClose} open={open}>
        <DialogTitleWrapper>
          <DialogTitle>프로필 선택</DialogTitle>
        </DialogTitleWrapper>
        <BoxCustom>
          <ImageListCustom
            sx={{ width: 500, height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {itemData !== undefined &&
              itemData.map((item) => (
                <Wrapper
                  key={item.profileImgId}
                  onClick={(event) =>
                    handleImageListItemClick(item.profileImgUrl)(
                      item.profileImgId,
                    )(event)
                  }
                >
                  <ImageListItemCustom>
                    <img
                      src={`${item.profileImgUrl}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.profileImgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={`프로필 사진 ${item.profileImgId} 번`}
                      loading="lazy"
                    />
                  </ImageListItemCustom>
                </Wrapper>
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

const ImageListItemCustom = styled(ImageListItem)`
  cursor: pointer;
`;
const Wrapper = styled.div`
  width: auto;
  height: auto;
`;
export default ProfileImageList;
