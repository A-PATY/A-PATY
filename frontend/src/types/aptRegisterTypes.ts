export interface aptList {
  aptList: aptInfo[];
}

export interface aptInfo {
  aptId: number;
  aptName: string;
}

export interface aptListResponse {
  aptList: aptInfo[] | null;
  status: number | null;
  mesage: string | null;
}
