import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthorService } from '../service/author.service';
import { Author } from '../model/author';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
const tableName = 'Author';
@Component({
  selector: 'app-index-author',
  templateUrl: './index-author.component.html',
  styleUrls: ['./index-author.component.scss']
})
export class IndexAuthorComponent implements OnInit {
  authors: Author[] = [];

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
  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.showData(1);
  }
  deleteBook(id: Guid){ 
    this.authorService.delete(id).subscribe(res => { 
         this.authors = this.authors.filter(item => item.id !== id);
         console.log('Author deleted successfully!');
         this.router.navigateByUrl('panel/author');
    })
  }
  
  showData(page: any): void {
    this.page = page;
    this.loading = true;
    this.authorService.getAllByRoute(page, this.config.itemsPerPage)
        .subscribe( res => { 
            this.authors = res.results; 
            this.config.currentPage = page;
            this.total = res.rowCount;
            this.loading = false;
          },
          err => { 
            console.log(err);
          });
  }
}
