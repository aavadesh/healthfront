import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { Author } from '../../author/model/author';
import { Category } from '../../category/model/category';
const tableName = 'Book';
@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  categories: Category[] = []; 
  authors: Author[] = [];
  ddlCategory = "";
  ddlAuthor = "";

  form: any = {
    name: null,
    slug: null,
    slugname: null,
    categoryid: [],
    authorid: []
  };
  
  isBookAdded = false;
  constructor(private postService: PostService, private router: Router) { 
    this.GetCategoryList();
    this.GetAuthorList();}

  ngOnInit(): void {
  }

  onSubmit(): void {
    const data = {
      name: this.form.name,
      categoryId: this.form.categoryId,
      authorId: this.form.authorId,
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

  GetAuthorList(){
    this.postService.getAll("Author")
      .subscribe(res => {
          this.authors = res;
          console.log(res);
        },
        err => { 
          console.log(err);
        });
  }
}
