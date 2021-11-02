import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { PostService } from 'src/app/_services/post.service';
import { Category } from '../model/category';
import { Guid } from 'guid-typescript';

const tableName = 'Category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id!: Guid;
  category!: Category;
  editForm!: FormGroup;;
  
  constructor( public postService: PostService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder) { 
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(!this.id) {
      alert("Invalid action.")
      this.router.navigateByUrl('panel/category');
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      slug: [],
      bookCategories: []
    });
    this.postService.find(this.id, tableName)
      .subscribe( data => {
      this.editForm.setValue(data);
      this.editForm.controls['slug'].disable();
      });
  }
  submit(){
    console.log(this.editForm.value);
    this.postService.update(this.editForm.value, tableName).subscribe(res => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('panel/category');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/category');
  }
}
