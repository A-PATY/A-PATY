export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  newMember: boolean;
  status: number | null;
  success: boolean;
  message: string;
}
