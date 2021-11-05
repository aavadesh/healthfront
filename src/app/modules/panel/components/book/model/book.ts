import { Guid } from "guid-typescript";

export interface Book {
    id: Guid;
    name: string;
    slug: string;
    slugName: string;
    categoryId?: Guid;
    categoryName: string;
    authorId: Guid;
    authorFullName: string;
}
