import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Book } from '../../book/model/book';
import { AuthorService } from '../service/author.service';
const tableName = 'Author';
@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {
  //books: Book[] = [];
  //ddlBook = "";
  //books: Book[] = [];
  //ddlBook = "";
  form!: FormGroup;
  submitted = false;
  
  isAuthorAdded = false;
  constructor(private authorService: AuthorService, private router: Router, private formBuilder: FormBuilder) { 
   // this.GetBookList();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]],
      surName: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]]
  });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
    debugger
    this.authorService.create(this.form.value).subscribe(() => { debugger
         console.log('Author created successfully!');
         this.router.navigateByUrl('panel/author');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/author');
  }
}
