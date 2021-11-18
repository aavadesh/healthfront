import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Book } from '../model/book';
import { BookService } from '../service/book.service';

const tableName = 'Book';

@Component({
  selector: 'app-index-book',
  templateUrl: './index-book.component.html',
  styleUrls: ['./index-book.component.scss']
})
export class IndexBookComponent implements OnInit {
  books: Book[] = [];

  p!: number;
  itemsPerPage = 15;
  totalItems: any;
  filterTerm!: string;

  constructor(private bookService: BookService, private router: Router,
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
            this.bookService.delete(id).subscribe(res => {
              this.books = this.books.filter(item => item.id !== id);
              this.messageService.add({ key: 'myKey1', severity:'info', summary:'Confirmed', detail:'Record deleted'});
              this.router.navigateByUrl('panel/book');
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
    this.bookService.getAllByRoute(page, this.itemsPerPage)
        .subscribe( res => {
        debugger
          this.books = res.results;
          this.totalItems = res.rowCount;
          },
          err => { 
            console.log(err);
          });
  }
  getPage(page: any) {
    debugger
    this.bookService.getAllByRoute(page, this.itemsPerPage)
        .subscribe( res => {
          debugger
          this.books = res.results;
          this.totalItems = res.rowCount;
    })
  }
}
