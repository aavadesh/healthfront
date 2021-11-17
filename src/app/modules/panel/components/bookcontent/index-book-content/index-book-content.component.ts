import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { BookcontentService } from '../service/bookcontent.service';
import { Bookcontent } from '../model/bookcontent';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

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
  constructor(private bookContentService: BookcontentService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.showData(1);
  }
  onDelete(id: Guid, elementName: string){debugger
   
    this.confirmationService.confirm({
      message: `Do you want to delete ${elementName}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
          

       this.bookContentService.delete(id).subscribe( (data)=>{
       // this.bookContent = this.bookContent.filter(u => u.id !== id);
       setTimeout(() => {
        this.messageService.add({ key: 'myKey1', severity:'info', summary:'Confirmed', detail:'Record deleted'});
      }, 500);
        
        this.showData(1);
      },(error)=>{
      } );
      },
      reject: (type: any) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({key: 'myKey1', severity:'error', summary:'Rejected', detail:'You have rejected'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({key: 'myKey1', severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
              break;
          }
      }
  });
  }
  
  showData(page: any): void {
    this.page = page;
    this.loading = true;
    this.bookContentService.getAllByRoute(page, this.config.itemsPerPage)
        .subscribe( res => {
          debugger
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
