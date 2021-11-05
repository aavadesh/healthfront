import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { Book } from '../../book/model/book';
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
  constructor(private postService: PostService, private router: Router) {this.GetBookList(); }

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

    this.postService.create(data, tableName).subscribe(() => {
         console.log('bookcontent created successfully!');
         this.router.navigateByUrl('panel/bookContent');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/bookContent');
  }
  GetBookList(){
    this.postService.getAll("Book")
      .subscribe(res => {
          this.books = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }
}
