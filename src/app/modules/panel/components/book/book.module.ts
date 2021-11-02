import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookRoutingModule } from './book-routing.module';
import { CreateBookComponent } from './create-book/create-book.component';
import { IndexBookComponent } from './index-book/index-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';


@NgModule({
  declarations: [
    CreateBookComponent,
    IndexBookComponent,
    EditBookComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule, NgxPaginationModule,Ng2SearchPipeModule  
  ]
})
export class BookModule { }
