import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { IndexCategoryComponent } from './index-category/index-category.component';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CreateCategoryComponent, EditCategoryComponent, IndexCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule, NgxPaginationModule,Ng2SearchPipeModule, 
    ConfirmDialogModule,
    ToastModule, ButtonModule
  ],
  providers: [ConfirmationService, MessageService ],
})
export class CategoryModule { }
