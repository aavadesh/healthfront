import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthorService } from '../service/author.service';
import { Author } from '../model/author';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
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
  constructor(private authorService: AuthorService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.showData(1);
  }
  onDelete(id: Guid, elementName: string){
    this.confirmationService.confirm({
      message: `Do you want to delete ${elementName}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
            this.authorService.delete(id).subscribe(res => { 
              this.authors = this.authors.filter(item => item.id !== id);
              this.messageService.add({ key: 'myKey1', severity:'info', summary:'Confirmed', detail:'Record deleted'});
              this.router.navigateByUrl('panel/author');
        })
      },
      reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({ key: 'myKey1', severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ key: 'myKey1', severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
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
