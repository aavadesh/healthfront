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
  editForm!: FormGroup;
  
  categories: Category[] = [];
  ddlCategory = "";
  
  authors: Author[] = [];
  ddlAuthor = "";
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
  this.editForm = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    slug: [],
    slugName: [],
    categoryName: [],
    categoryId: [],
    authorFullName: [],
    authorId: []
  });
  this.bookService.findById(this.id, tableName, 'GetByBookId')
    .subscribe( data => {
      debugger
    this.editForm.setValue(data);
    this.editForm.controls['slug'].disable();
    this.editForm.controls['slugName'].disable();
    });
  }
  submit(){
    debugger
    console.log(this.editForm.value);
    this.bookService.update(this.editForm.value, tableName).subscribe(res => {
         console.log('Book updated successfully!');
         this.router.navigateByUrl('panel/book');
    })
  }

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
