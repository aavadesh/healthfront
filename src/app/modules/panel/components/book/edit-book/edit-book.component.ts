import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { PostService } from 'src/app/_services/post.service';
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
  
  constructor(public postService: PostService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { this.GetCategoryList();}

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
    categoryId: []
  });
  this.postService.findById(this.id, tableName, 'GetByBookId')
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
    this.postService.update(this.editForm.value, tableName).subscribe(res => {
         console.log('Book updated successfully!');
         this.router.navigateByUrl('panel/book');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/book');
  }
  
  GetCategoryList(){
    this.postService.getAll("Category")
      .subscribe(res => {
          this.categories = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }
}
