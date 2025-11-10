export default interface useUser {
  isLogin: boolean;
  userid: number;
  userName: string;
  userId: string;
  email?: string;
  creattime?: string;
}

export interface useUserLogReg {
  username: string;
  password: string;
}
