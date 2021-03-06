import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';
import { Guid } from "guid-typescript";
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.scss']
})
export class IndexCategoryComponent implements OnInit {
  public categories!: Category[];
  filterTerm!: string;  
  p!: number;
  itemsPerPage = 15;
  totalItems: any;
  currentPage!: number;
  
  constructor(private categoryService: CategoryService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.showData(1);
}
deleteCategory(id: Guid, elementName: string){
  this.confirmationService.confirm({
    message: `Do you want to delete ${elementName}?`,
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
        this.categoryService.delete(id).subscribe(res => {
          debugger
          setTimeout(() => {
            this.messageService.add({ key: 'myKey1', severity:'info', summary:'Confirmed', detail:'Record deleted'});
          }, 500);
            
            this.showData(this.currentPage);
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
 debugger
  this.categoryService.getAllByRoute(page, this.itemsPerPage)
      .subscribe(x => {
          this.categories = x.results;
          this.totalItems = x.rowCount;
          this.currentPage = x.currentPage;
        },
        err => {
          console.log(err);
        });
      }

      getPage(page: any) {debugger
        this.categoryService.getAllByRoute(page, this.itemsPerPage)
        .subscribe(x => {debugger
          this.categories =  x.results;
          this.totalItems = x.rowCount;
          this.currentPage = x.currentPage;
        })
      }
}
