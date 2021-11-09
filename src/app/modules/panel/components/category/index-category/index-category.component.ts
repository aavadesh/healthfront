import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';
import { Guid } from "guid-typescript";
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';

@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.scss']
})
export class IndexCategoryComponent implements OnInit {
  public categories!: Category[];
  page: number = 1;
  total: number = 10;
  loading: boolean = false;
  filterTerm!: string;
  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 5,
    currentPage: this.page,
    totalItems: this.total
  };
  constructor(private categoryService: CategoryService, private router: Router) { }
  ngOnInit(): void {
    this.showData(1);
}
deleteCategory(id: Guid){
  this.categoryService.delete(id).subscribe(res => {
       this.categories = this.categories.filter(item => item.id !== id);
       console.log('Category deleted successfully!');
       this.router.navigateByUrl('panel/category');
  })
}
showData(page: any): void {
  this.page = page;
  this.loading = true;
  this.categoryService.getAllByRoute(page, this.config.itemsPerPage)
      .subscribe(x => {
          this.config.currentPage = page;
          this.categories = x.results;
          this.total = x.rowCount;
          this.loading = false;
        },
        err => {
          console.log(err);
        });
      }
}
