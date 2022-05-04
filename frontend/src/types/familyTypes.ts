export interface memberProps {
  member: {
    userId: number;
    userName: string;
    findFamily: boolean; 
    profileImgUrl: string;
  },
  changeMember: (member: familyList) => void, // 아무것도 리턴하지 X
};

export interface familyList {
  userId: number;
  userName: string;
  findFamily: boolean; 
  profileImgUrl: string;
};

export interface location {
  lat: number;
  lng: number;
}