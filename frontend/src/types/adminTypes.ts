export interface billList {
  bills: bill[] | null;
  status: number | null;
  message: string | null;
}

export interface bill {
  billId: number;
  billImg: string;
}

export interface approveBillRequest {
  aptId: string;
  dong: string;
  ho: string;
  doroJuso: string;
  kakaoId: string;
  billImg: string;
}

export interface rejectBillRequest {
  kakaoId: string;
  billImg: string;
}
