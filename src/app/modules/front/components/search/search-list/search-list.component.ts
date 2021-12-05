import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Search } from '../model/Search';
import { SearchService } from '../service/search.service';
import { Location } from '@angular/common';
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
  searchStrig!: string;

  constructor(private searchService: SearchService, private router: Router,
    private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    
  }

  

  onClick() {
    debugger
    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: {q: decodeURIComponent(this.searchPhase)}}).toString()
    this.location.go(url);
    this.searchService.getAllBySearch(encodeURIComponent(this.searchPhase))
      .subscribe(res => {
          this.searchList = res;
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
