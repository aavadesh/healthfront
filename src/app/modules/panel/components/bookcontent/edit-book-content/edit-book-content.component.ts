import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookcontentService } from '../service/bookcontent.service';
import { Book } from '../../book/model/book';
import { Bookcontent } from '../model/bookcontent';
const tableName = 'BookContent';
@Component({
  selector: 'app-edit-book-content',
  templateUrl: './edit-book-content.component.html',
  styleUrls: ['./edit-book-content.component.scss']
})
export class EditBookContentComponent implements OnInit {
  id!: Guid;
  bookContent!: Bookcontent;
  form!: FormGroup;
  submitted = false;
  
  books: Book[] = [];
  ddlCategory = "";
  constructor(public bookContentService: BookcontentService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { this.GetBookList();
      this.form = this.formBuilder.group({
        id: [],
        book: [],
        content: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]],
        pageNumber: ['', Validators.required],
        bookId: ['', [Validators.required]]
    });
    }

  ngOnInit(): void {
    debugger
    this.id = this.route.snapshot.params['id'];
  if(!this.id) {
    alert("Invalid action.")
    this.router.navigateByUrl('panel/bookContent');
    return;
  }

  this.bookContentService.find(this.id, tableName)
    .subscribe( data => {
      debugger
    this.form.setValue(data);
    });
  }
  onSubmit(){
    debugger
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    console.log(this.form.value);
    this.bookContentService.update(this.form.value).subscribe(res => {
         console.log('Book Content updated successfully!');
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
