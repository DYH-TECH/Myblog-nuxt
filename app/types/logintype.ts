export interface useLoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
    username: string;
    user_id: number;
  };
}
export interface useUpdateResponse {
  code: number;
  message: string;
}
