import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Author } from '../../author/model/author';
import { Category } from '../../category/model/category';
import { BookService } from '../service/book.service';
const tableName = 'Book';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  categories: Category[] = []; 
  authors: Author[] = [];
  form!: FormGroup;
  submitted = false;
  isBookAdded = false;
  constructor(private bookService: BookService, private router: Router, private formBuilder: FormBuilder) { 
    this.GetCategoryList();
    this.GetAuthorList();

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]],
      categoryid: ['', Validators.required],
      authorid: ['', [Validators.required]],
      slug: [''],
      slugname: ['']
  });
  }

  ngOnInit(): void {
    
}
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.bookService.create(this.form.value).subscribe(() => {
         console.log('book created successfully!');
         this.router.navigateByUrl('panel/book');
    })
  }
  
  onCancel(): void {
    this.router.navigateByUrl('panel/book');
  }
  GetCategoryList(){
    this.bookService.getAll("Category")
      .subscribe(res => {
        debugger
          this.categories = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }

  GetAuthorList(){
    this.bookService.getAll("Author")
      .subscribe(res => {
          this.authors = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }
}
