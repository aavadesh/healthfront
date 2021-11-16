import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookcontentService } from '../service/bookcontent.service';
import { Bookcontent } from '../model/bookcontent';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';

const tableName = 'BookContent';
@Component({
  selector: 'app-index-book-content',
  templateUrl: './index-book-content.component.html',
  styleUrls: ['./index-book-content.component.scss']
})
export class IndexBookContentComponent implements OnInit {
  bookContent: Bookcontent[] = [];

  page: number = 1;
  total: number = 2;
  loading: boolean = false;
  filterTerm!: string;

  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 15,
    currentPage: this.page,
    totalItems: this.total
  };
  constructor(private bookContentService: BookcontentService, private router: Router) { }

  ngOnInit(): void {
    this.showData(1);
  }
  deleteContent(id: Guid){debugger
    this.bookContentService.delete(id).subscribe(res => {debugger
         this.bookContent = this.bookContent.filter(item => item.id !== id);
         console.log('BookContent deleted successfully!');
         this.router.navigateByUrl('panel/bookContent');
    })
  }
  
  showData(page: any): void {
    this.page = page;
    this.loading = true;
    this.bookContentService.getAllByRoute(page, this.config.itemsPerPage)
        .subscribe( res => {
          this.config.currentPage = page;
          this.bookContent = res.results;
          this.total = res.rowCount;
          this.loading = false;
            console.log(res);
          },
          err => { 
            console.log(err);
          });
  }
}
