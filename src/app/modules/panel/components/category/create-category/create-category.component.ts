import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categories: Category[] = [];
  form!: FormGroup;
  submitted = false;
  
  isCategoryAdded = false;
  constructor(private categoryService: CategoryService, private router: Router, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^((?!\s{2,}).)*$/)]]
  });
}
 // convenience getter for easy access to form fields
 get f() { return this.form.controls; }

  onSubmit(): void {
    debugger
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }


    this.categoryService.create(this.form.value).subscribe(() => {
         console.log('Category created successfully!');
         this.router.navigateByUrl('panel/category');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/category');
  }
}
