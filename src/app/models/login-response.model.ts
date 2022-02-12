import { UserModel } from "./user.model";

export interface LoginResponse {
  data: UserModel;
  msg?: any;
  token?: string;
}

interface Msg {
  summary: string;
  detail: string;
  code: string;
}

interface Data {
  user: UserModel;
}
