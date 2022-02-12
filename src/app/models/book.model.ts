import { AuthorModel } from "./author.model";

export interface BookModel {
  id?: number;
  author?: AuthorModel;
  title?: string;
  editionDate?: string;
  editionNumber?: number;
  updatedAt?: Date;
  createdAt?: Date;
}
