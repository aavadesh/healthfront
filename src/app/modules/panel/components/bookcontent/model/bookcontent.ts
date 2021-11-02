import { Guid } from "guid-typescript";

export interface Bookcontent {
    id: Guid;
    content: string;
    pageNumber: number;
    bookId: Guid;
    bookName: string;
}
