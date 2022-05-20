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

// export interface doroJusoRequest {
//   confmKey: string;
//   currentPage: number;
//   countPerPage: number;
//   resultType: string;
//   keyword: string;
// }

export interface doroJuso {
  id: string;
  road_address_name: string;
  name: string;
}

export interface kakaoMapSearchKeywordResponse {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface aptRegisterResponse {
  status: number | null;
  message: string;
}
