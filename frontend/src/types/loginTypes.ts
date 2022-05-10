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
  userInfo: UserInfo | null;
}
export interface UserInfo {
  //회원가입 실패 후 소셜 로그인 했을 때
  userId: number; // 얘는 정상적으로 반환
  nickName: string; // null
  communityList: community[]; // []
  sidoName: string; // null
  gugunName: string; //null
  dongName: string; //null
  aptName: string | null; //null
  dong: string | null; //null
  ho: string | null; //null
  profileImgId: number; // 1
  findFamily: boolean; // false
  role: 'ROLE_USER' | 'ROLE_ADMIN'; // ROLE_USER
  billStatus: '미제출' | '승인 대기중' | '반려' | '승인'; // 미제출
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
