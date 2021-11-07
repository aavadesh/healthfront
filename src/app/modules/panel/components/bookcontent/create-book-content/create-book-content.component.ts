import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../book/model/book';
import { BookcontentService } from '../service/bookcontent.service';
const tableName = 'BookContent';
@Component({
  selector: 'app-create-book-content',
  templateUrl: './create-book-content.component.html',
  styleUrls: ['./create-book-content.component.scss']
})
export class CreateBookContentComponent implements OnInit {
  books: Book[] = [];
  ddlBook = "";

  form: any = {
    content: null,
    pageNumber: null,
    bookName: null,
    bookId: []
  };
  isBookContentAdded = false;
  constructor(private bookContentService: BookcontentService, private router: Router) {this.GetBookList(); }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const data = {
      content: this.form.content,
      pageNumber: this.form.pageNumber,
      bookId: this.form.bookId,
    };
    if (!data.content) {
      alert('Please add bookcontent!');
      return;
    }

    this.bookContentService.create(data, tableName).subscribe(() => {
         console.log('bookcontent created successfully!');
         this.router.navigateByUrl('panel/bookContent');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/bookContent');
  }
  GetBookList(){
    this.bookContentService.getAll("Book")
      .subscribe(res => {
          this.books = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }
}
