export interface memberProps {
  member: {
    userId: number;
    nickname: string;
    findFamily: boolean; 
    profileImgUrl: string;
  },
  changeMember: (member: familyList) => void, 
};

export interface familyList {
  userId: number;
  nickname: string;
  findFamily: boolean; 
  profileImgUrl: string;
};

export interface location {
  lat: number;
  lng: number;
}