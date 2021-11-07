import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthorService } from '../service/author.service';
import { Author } from '../model/author';
const tableName = 'Author';
@Component({
  selector: 'app-index-author',
  templateUrl: './index-author.component.html',
  styleUrls: ['./index-author.component.scss']
})
export class IndexAuthorComponent implements OnInit {
  authors: Author[] = [];

  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [5, 10, 15];

  term!: string;
  event: any;
  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.showData();
  }
  deleteBook(id: Guid){ debugger
    this.authorService.delete(id, tableName).subscribe(res => { debugger
         this.authors = this.authors.filter(item => item.id !== id);
         console.log('Author deleted successfully!');
         this.router.navigateByUrl('panel/author');
    })
  }
  
  showData(): void {
    debugger
    this.authorService.getAllByRoute(tableName, 'GetAuthorAll')
        .subscribe( res => { debugger
            this.authors = res;
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
