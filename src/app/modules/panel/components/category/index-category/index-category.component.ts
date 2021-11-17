import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';
import { Guid } from "guid-typescript";
import { PaginationInstance } from 'ngx-pagination/dist/pagination-instance';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-index-category',
  templateUrl: './index-category.component.html',
  styleUrls: ['./index-category.component.scss']
})
export class IndexCategoryComponent implements OnInit {
  public categories!: Category[];
  page: number = 1;
  total: number = 2;
  loading: boolean = false;
  filterTerm!: string;  
  confirmDropDatabaseDialogVisible = false;
  public config: PaginationInstance = {
    id: 'server',
    itemsPerPage: 15,
    currentPage: this.page,
    totalItems: this.total
  };
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
                  this.categories = this.categories.filter(item => item.id !== id);
                  this.messageService.add({key: 'myKey1', severity:'info', summary:'Confirmed', detail:'Record deleted'});
                  this.router.navigateByUrl('panel/category');
        })
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
  this.categoryService.getAllByRoute(page, this.config.itemsPerPage)
      .subscribe(x => {
          this.config.currentPage = page;
          this.categories = x.results;
          this.total = x.rowCount;
          this.loading = false;
        },
        err => {
          console.log(err);
        });
      }
}
