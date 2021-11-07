import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';

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
  constructor(private categoryService: CategoryService, private router: Router) {
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

    this.categoryService.create(data, tableName).subscribe(() => {
         console.log('Category created successfully!');
         this.router.navigateByUrl('panel/category');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/category');
  }
}
