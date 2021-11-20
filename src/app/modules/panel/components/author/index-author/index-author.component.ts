import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { AuthorService } from '../service/author.service';
import { Author } from '../model/author';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
const tableName = 'Author';
@Component({
  selector: 'app-index-author',
  templateUrl: './index-author.component.html',
  styleUrls: ['./index-author.component.scss']
})
export class IndexAuthorComponent implements OnInit {
  authors: Author[] = [];
  p!: number;
  itemsPerPage = 15;
  totalItems: any;
  filterTerm!: string;  

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
    this.authorService.getAllByRoute(page, this.itemsPerPage)
        .subscribe( res => {
          this.authors = res.results;
          this.totalItems = res.rowCount;
          },
          err => { 
            console.log(err);
          });
  }
  getPage(page: any) {
    this.authorService.getAllByRoute(page, this.itemsPerPage)
    .subscribe(x => {
      this.authors =  x.results;
      this.totalItems = x.rowCount;

    })
  }
}
