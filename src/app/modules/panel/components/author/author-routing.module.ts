import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { IndexAuthorComponent } from './index-author/index-author.component';

const routes: Routes = [
  { path: '', component: IndexAuthorComponent },
  { path: 'index', component: IndexAuthorComponent },
  { path: 'create', component: CreateAuthorComponent },
  { path: 'edit/:id', component: EditAuthorComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
