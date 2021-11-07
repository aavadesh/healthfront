import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookService } from '../service/book.service';
import { Book } from '../model/book';

const tableName = 'Book';

@Component({
  selector: 'app-index-book',
  templateUrl: './index-book.component.html',
  styleUrls: ['./index-book.component.scss']
})
export class IndexBookComponent implements OnInit {
  books: Book[] = [];

  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  term!: string;
  event: any;
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.showData();
  }
  
  deleteBook(id: Guid){
    this.bookService.delete(id, tableName).subscribe(res => {
         this.books = this.books.filter(item => item.id !== id);
         console.log('Book deleted successfully!');
         this.router.navigateByUrl('panel/book');
    })
  }
  
  showData(): void {
    this.bookService.getAllByRoute(tableName, 'GetBookAll')
        .subscribe( res => {
            this.books = res;
            console.log(res);
          },
          err => { 
            console.log(err);
          });
  }
  
  handlePageChange(event: number) {
    this.page = event;
    this.showData();
  }
}
