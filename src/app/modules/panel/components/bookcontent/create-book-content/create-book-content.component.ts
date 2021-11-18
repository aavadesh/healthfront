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
  errorMessage = '';
  selectBook!: '';
  
  isFailed = false;
  constructor(private bookContentService: BookcontentService, private router: Router, private formBuilder: FormBuilder) {this.GetBookList(); 
    this.form = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(8000)]],
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
         this.isFailed = false;
         this.router.navigateByUrl('panel/bookContent');
    },err => {
      debugger
      if (err.includes("409"))
      {        
        debugger
        this.isFailed = true;
        this.errorMessage = `${this.selectBook} of the book already exists in the database.`;
      }
    })
  }
  get f() { return this.form.controls; }

  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  public onChange(event: any): void {  // event will give you full breif of action
    debugger
    let selectElementText = event.target['options']
      [event.target['options'].selectedIndex].text;
      this.selectBook = selectElementText;  
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
