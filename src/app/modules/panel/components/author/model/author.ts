import { Guid } from "guid-typescript";

export interface Author {
    id: Guid;
    name: string;
    surname: string;
    slug: string;
   // bookId: Guid;
   // bookName: string;
}
