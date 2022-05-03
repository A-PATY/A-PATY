export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  newMember: boolean;
  status: number | null;
  success: boolean;
  message: string;
}

export interface UserInfo {
  userId: number;
  nickName: string;
  communityList: community[];
  sidoName: string;
  gugunName: string;
  dongName: string;
  aptName: string;
  dong: string;
  ho: string;
  profileImgId: number;
  findFamily: boolean;
}

export interface community {
  communityId: number;
  communityType: string;
  communityType2: string;
}

export interface profileImgList {
  profileImgList: profileImg[];
}

export interface profileImg {
  profileImgId: number;
  profileImgUrl: string;
}
