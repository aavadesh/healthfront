import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';
import { Guid } from 'guid-typescript';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  id!: Guid;
  category!: Category;
  form!: FormGroup;
  submitted = false;
  nonWhitespaceRegExp: RegExp = new RegExp("\\S");
  constructor( public categoryService: CategoryService,
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
    this.form = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.pattern(this.nonWhitespaceRegExp)]],
      slug: [],
      bookCategories: []
    });
    this.categoryService.find(this.id)
      .subscribe( data => {
      this.form.setValue(data);
      this.form.controls['slug'].disable();
      });
  }
   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        debugger
    this.categoryService.update(this.form.value).subscribe(res => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('panel/category');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/category');
  }
}
