import { AuthorModel } from "./author.model";

export interface BookModel {
  id?: number;
  author?: AuthorModel;
  title?: string;
  dateEdition?: string;
  numberEdition?: number;
  updatedAt?: Date;
  createdAt?: Date;
}
