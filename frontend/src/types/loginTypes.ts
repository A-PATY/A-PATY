export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  newMember: boolean;
  status: number | null;
  message: string;
}

export interface IssueTokenResponse {
  accessToken: string;
  refreshToken: string;
  status: number | null;
  message: string;
}

export interface LogInResponse {
  userInfo: UserInfo;
}
export interface UserInfo {
  userId: number;
  nickName: string;
  communityList: community[];
  sidoName: string;
  gugunName: string;
  dongName: string;
  aptName: string | null;
  dong: string | null;
  ho: string | null;
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

export interface xy {
  x: number;
  y: number;
}

export interface signUpRequest {
  nickName: string;
  profileImgId: number;
  address: string;
  name: string;
}
