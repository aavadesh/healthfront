import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { Category } from '../../category/model/category';
const tableName = 'Book';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  categories: Category[] = [];
  ddlCategory = "";

  form: any = {
    name: null,
    slug: null,
    slugname: null,
    categoryid: []
  };
  
  isBookAdded = false;
  constructor(private postService: PostService, private router: Router) { 
    this.GetCategoryList();}

  ngOnInit(): void {
  }

  onSubmit(): void {
    const data = {
      name: this.form.name,
      categoryId: this.form.categoryId,
    };
    if (!data.name) {
      alert('Please add book name!');
      return;
    }

    this.postService.create(data, tableName).subscribe(() => {
         console.log('book created successfully!');
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
