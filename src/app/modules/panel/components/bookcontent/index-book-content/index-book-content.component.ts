import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookcontentService } from '../service/bookcontent.service';
import { Bookcontent } from '../model/bookcontent';

const tableName = 'BookContent';
@Component({
  selector: 'app-index-book-content',
  templateUrl: './index-book-content.component.html',
  styleUrls: ['./index-book-content.component.scss']
})
export class IndexBookContentComponent implements OnInit {
  bookContent: Bookcontent[] = [];

  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  term!: string;
  event: any;
  constructor(private bookContentService: BookcontentService, private router: Router) { }

  ngOnInit(): void {
    this.showData();
  }
  deleteContent(id: Guid){debugger
    this.bookContentService.delete(id, tableName).subscribe(res => {debugger
         this.bookContent = this.bookContent.filter(item => item.id !== id);
         console.log('BookContent deleted successfully!');
         this.router.navigateByUrl('panel/bookContent');
    })
  }
  
  showData(): void {
    this.bookContentService.getAll(tableName)
        .subscribe( res => {
            this.bookContent = res;
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
