import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorRoutingModule } from './author-routing.module';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IndexAuthorComponent } from './index-author/index-author.component';
import {  } from '@angular/forms';


@NgModule({
  declarations: [CreateAuthorComponent, EditAuthorComponent, IndexAuthorComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FormsModule,
    ReactiveFormsModule, HttpClientModule, NgxPaginationModule,Ng2SearchPipeModule
  ]
})
export class AuthorModule { }
