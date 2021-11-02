import { Guid } from "guid-typescript";

export interface Author {
    id: Guid;
    name: string;
    surName: string;
    slug: string;
    bookId: Guid;
    bookName: string;
}
