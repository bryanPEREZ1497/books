import { UserModel } from "./user.model";

export interface AuthorModel {
  id?: number;
  user?: UserModel;
  updatedAt?: Date;
  createdAt?: Date;
}
