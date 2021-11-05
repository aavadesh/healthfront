import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { PostService } from 'src/app/_services/post.service';
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
  editForm!: FormGroup;
  
  books: Book[] = [];
  ddlCategory = "";
  constructor(public postService: PostService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { this.GetBookList();}

  ngOnInit(): void {
    debugger
    this.id = this.route.snapshot.params['id'];
  if(!this.id) {
    alert("Invalid action.")
    this.router.navigateByUrl('panel/bookContent');
    return;
  }
  this.editForm = this.formBuilder.group({
    id: [],
    content: ['', Validators.required],
    pageNumber: [],
    bookId: [],
    book: []
  });
  this.postService.find(this.id, tableName)
    .subscribe( data => {
      debugger
    this.editForm.setValue(data);
    });
  }
  submit(){
    debugger
    console.log(this.editForm.value);
    this.postService.update(this.editForm.value, tableName).subscribe(res => {
         console.log('Book Content updated successfully!');
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
