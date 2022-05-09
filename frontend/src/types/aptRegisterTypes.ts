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

export interface doroJusoRequest {
  confmKey: string;
  currentPage: number;
  countPerPage: number;
  resultType: string;
  keyword: string;
}

export interface doroJuso {
  admCd: string;
  bdKdcd: string;
  bdMgtSn: string;
  bdNm: string;
  buldMnnm: string;
  buldSlno: string;
  detBdNmList: string;
  emdNm: string;
  emdNo: string;
  engAddr: string;
  jibunAddr: string;
  liNm: string;
  lnbrMnnm: string;
  lnbrSlno: string;
  mtYn: string;
  rn: string;
  rnMgtSn: string;
  roadAddr: string;
  roadAddrPart1: string;
  roadAddrPart2: string;
  sggNm: string;
  siNm: string;
  udrtYn: string;
  zipNo: string;
}
