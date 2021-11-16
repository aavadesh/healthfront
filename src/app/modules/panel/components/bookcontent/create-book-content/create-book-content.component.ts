import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;
  submitted = false;
  isBookContentAdded = false;
  constructor(private bookContentService: BookcontentService, private router: Router, private formBuilder: FormBuilder) {this.GetBookList(); 
    this.form = this.formBuilder.group({
      content: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]],
      pageNumber: ['', Validators.required],
      bookName: [''],
      bookId: ['', [Validators.required]]
  });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {debugger
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.bookContentService.create(this.form.value).subscribe(() => {
         console.log('bookcontent created successfully!');
         this.router.navigateByUrl('panel/bookContent');
    })
  }
  get f() { return this.form.controls; }

  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
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
