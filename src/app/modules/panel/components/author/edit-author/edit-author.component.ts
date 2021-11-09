import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthorService } from '../service/author.service';
import { Book } from '../../book/model/book';
import { Author } from '../model/author';
const tableName = 'Author';
@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss']
})
export class EditAuthorComponent implements OnInit {
  id!: Guid;
  author!: Author;
  editForm!: FormGroup;
  
  books: Book[] = [];
  ddlBook = "";
  constructor(public authorService: AuthorService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { 
    this.GetBookList();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  if(!this.id) {
    alert("Invalid action.")
    this.router.navigateByUrl('panel/book');
    return;
  }
  this.editForm = this.formBuilder.group({
    id: [],
    name: ['', Validators.required],
    surname: [],
    slug: [],
    bookName: [],
    bookId: []
  });
  debugger
  this.authorService.find(this.id)
    .subscribe( data => {
      debugger
    this.editForm.setValue(data);
    this.editForm.controls['slug'].disable();
    });
  }
  submit(){
    debugger
    console.log(this.editForm.value);
    this.authorService.update(this.editForm.value).subscribe(res => { debugger
         console.log('Author updated successfully!');
         this.router.navigateByUrl('panel/author');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/author');
  }
  
  GetBookList(){ debugger
    this.authorService.getAll("Book")
      .subscribe(res => { debugger
          this.books = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }
}
