import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';  
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FrontRoutingModule } from './front-routing.module';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FrontRoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ConfirmDialogModule,
    ToastModule, ButtonModule
  ],
  providers: [ConfirmationService, MessageService],
})
export class FrontModule { }
