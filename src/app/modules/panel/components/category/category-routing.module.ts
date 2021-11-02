import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { IndexCategoryComponent } from './index-category/index-category.component';

const routes: Routes = [
  { path: '', component: IndexCategoryComponent },
  { path: 'index', component: IndexCategoryComponent },
  { path: 'create', component: CreateCategoryComponent },
  { path: 'edit/:id', component: EditCategoryComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
