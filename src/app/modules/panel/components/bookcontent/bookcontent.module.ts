import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookcontentRoutingModule } from './bookcontent-routing.module';
import { EditBookContentComponent } from './edit-book-content/edit-book-content.component';
import { IndexBookContentComponent } from './index-book-content/index-book-content.component';
import { CreateBookContentComponent } from './create-book-content/create-book-content.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [CreateBookContentComponent, EditBookContentComponent, IndexBookContentComponent
  ],
  imports: [
    CommonModule,
    BookcontentRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule, NgxPaginationModule,Ng2SearchPipeModule,
    ConfirmDialogModule,
    ToastModule, ButtonModule  
  ],
  providers: [ConfirmationService, MessageService ],
})
export class BookcontentModule { }
