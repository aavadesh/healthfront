import { Guid } from "guid-typescript";

export interface Search {
    bookId: Guid;
    authorName: string;
    authorSurName: string;
    bookName: string;
    pagesNumber: string;
}
