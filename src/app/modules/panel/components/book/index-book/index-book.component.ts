import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import { Book } from '../model/book';
import { BookService } from '../service/book.service';

const tableName = 'Book';

@Component({
  selector: 'app-index-book',
  templateUrl: './index-book.component.html',
  styleUrls: ['./index-book.component.scss']
})
export class IndexBookComponent implements OnInit {
  books: Book[] = [];

  page: number = 1;
  total: number = 10;
  loading: boolean = false;
  filterTerm!: string;

  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 5,
    currentPage: this.page,
    totalItems: this.total
  };
  
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.showData(1);
  }
  
  deleteBook(id: Guid){
    this.bookService.delete(id).subscribe(res => {
         this.books = this.books.filter(item => item.id !== id);
         console.log('Book deleted successfully!');
         this.router.navigateByUrl('panel/book');
    })
  }
  
  showData(page: any): void {
    this.page = page;
  this.loading = true;
  debugger
    this.bookService.getAllByRoute(page, this.config.itemsPerPage)
        .subscribe( res => {
          debugger
          this.config.currentPage = page;
          this.books = res.results;
          this.total = res.rowCount;
          this.loading = false;
          },
          err => { 
            console.log(err);
          });
  }
}
