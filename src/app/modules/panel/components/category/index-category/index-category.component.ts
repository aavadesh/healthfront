import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/_services/post.service';
import { Category } from '../model/category';
import { Guid } from "guid-typescript";

const tableName = 'Category';
@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.scss']
})
export class IndexCategoryComponent implements OnInit {
  categories: Category[] = [];

  currentTutorial = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  term!: string;
  event: any;
  
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.showData();
}

deleteCategory(id: Guid){
  debugger
  this.postService.delete(id, tableName).subscribe(res => {
    debugger
       this.categories = this.categories.filter(item => item.id !== id);
       console.log('Category deleted successfully!');
       this.router.navigateByUrl('panel/category');
  })
}

showData(): void {
  this.postService.getAll(tableName)
      .subscribe(
        res => {
          this.categories = res;
          console.log(res);
        },
        err => {
          console.log(err);
        });
}

handlePageChange(event: number) {
  this.page = event;
  this.showData();
}
}
