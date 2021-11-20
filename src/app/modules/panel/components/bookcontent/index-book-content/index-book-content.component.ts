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
  p!: number;
  itemsPerPage = 15;
  totalItems: any;
  filterTerm!: string;

  
  constructor(private bookContentService: BookcontentService, private router: Router,
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
       this.bookContentService.delete(id).subscribe( (data)=>{
       // this.bookContent = this.bookContent.filter(u => u.id !== id);
       setTimeout(() => {
        this.messageService.add({ key: 'myKey1', severity:'info', summary:'Confirmed', detail:'Record deleted'});
      }, 500);
        
        this.showData(this.p);
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
    this.bookContentService.getAllByRoute(page, this.itemsPerPage)
        .subscribe( res => {
          this.bookContent = res.results;
          this.totalItems = res.rowCount;
          },
          err => { 
            console.log(err);
          });
  }
  getPage(page: any) {debugger
    this.bookContentService.getAllByRoute(page, this.itemsPerPage)
    .subscribe(x => {debugger
      this.bookContent =  x.results;
      this.totalItems = x.rowCount;

    })
  }
}
