import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBookContentComponent } from './create-book-content/create-book-content.component';
import { EditBookContentComponent } from './edit-book-content/edit-book-content.component';
import { IndexBookContentComponent } from './index-book-content/index-book-content.component';

const routes: Routes = [
  { path: '', component: IndexBookContentComponent },
  { path: 'index', component: IndexBookContentComponent },
  { path: 'create', component: CreateBookContentComponent },
  { path: 'edit/:id', component: EditBookContentComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookcontentRoutingModule { }
