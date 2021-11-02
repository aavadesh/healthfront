import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { IndexBookComponent } from './index-book/index-book.component';

const routes: Routes = [
  { path: '', component: IndexBookComponent },
  { path: 'index', component: IndexBookComponent },
  { path: 'create', component: CreateBookComponent },
  { path: 'edit/:id', component: EditBookComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
