import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookService } from '../service/book.service';
import { Author } from '../../author/model/author';
import { Category } from '../../category/model/category';
import { Book } from '../model/book';
const tableName = 'Book';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  
  id!: Guid;
  book!: Book;
  form!: FormGroup;
  
  categories: Category[] = [];
  ddlCategory = "";
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
  submitted = false;
  authors: Author[] = [];
  constructor(public bookService: BookService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { 
      this.GetCategoryList();
    this.GetAuthorList();
  }

  ngOnInit(): void {
    debugger
    this.id = this.route.snapshot.params['id'];
  if(!this.id) {
    alert("Invalid action.")
    this.router.navigateByUrl('panel/book');
    return;
  }
  this.form = this.formBuilder.group({
    id: [],
    name: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]],
    slug: [],
    slugName: [],
    categoryName: [],
    categoryId: ['', Validators.required],
    authorId: ['', [Validators.required]],
    authorFullName: [],
  });
  this.bookService.find(this.id)
    .subscribe( data => {
      debugger
    this.form.setValue(data);
    this.form.controls['slug'].disable();
    this.form.controls['slugName'].disable();
    });
  }
  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    console.log(this.form.value);
    this.bookService.update(this.form.value).subscribe(res => {
         console.log('Book updated successfully!');
         this.router.navigateByUrl('panel/book');
    })
  }
 // convenience getter for easy access to form fields
 get f() { return this.form.controls; }
 
  onCancel(): void {
    this.router.navigateByUrl('panel/book');
  }
  
  GetCategoryList(){
    this.bookService.getAll("Category")
      .subscribe(res => {
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
