export class Pagination
{
    page!: number;
    count!: number;
    pageSize!: number;
    pageSizes!: number[];

    constructor(page?: number, count?: number, pageSize?: number, pageSizes?: number[])
    {
        page = page;
        count = count;
        pageSize = pageSize;
        pageSizes = pageSizes;
    }
}