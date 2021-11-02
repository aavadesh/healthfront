import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { Category } from '../model/category';

const tableName = 'Category';
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categories: Category[] = [];

  form: any = {
    name: null
  };
  
  isCategoryAdded = false;
  constructor(private postService: PostService, private router: Router) {
   }

  ngOnInit(): void {  }

  onSubmit(): void {
    const data = {
      name: this.form.name
    };
    if (!data.name) {
      alert('Please add category name!');
      return;
    }

    this.postService.create(data, tableName).subscribe(() => {
         console.log('Category created successfully!');
         this.router.navigateByUrl('panel/category');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/category');
  }
}
