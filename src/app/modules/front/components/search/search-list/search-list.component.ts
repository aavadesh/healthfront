import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../model/Search';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {
  searchList: Search[] = [];
  p!: number;
  itemsPerPage = 15;
  totalItems: any;
  filterTerm!: string;
  searchPhase = '';

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
  }
  onClick() {
    debugger
    this.searchService.getAllBySearch(this.searchPhase)
      .subscribe(res => {
          this.searchList = res;
          // this.totalItems = res.rowCount;
        },
        error => {
          console.log(error);
        });
  }

  showData(page: any) {
    this.searchService.getAllByRoute(page, this.itemsPerPage)
    .subscribe( res => {
      this.searchList = res.results;
      this.totalItems = res.rowCount;
      },
      err => { 
        console.log(err);
      });
  }
  getPage(page: any) {
    this.searchService.getAllByRoute(page, this.itemsPerPage)
    .subscribe(x => {
      this.searchList =  x.results;
      this.totalItems = x.rowCount;

    })
  }

}
