export interface useLoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
    username: string;
  };
}
export interface useUpdateResponse {
  code: number;
  message: string;
}
