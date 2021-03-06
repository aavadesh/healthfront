import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchListComponent } from './search-list/search-list.component';

const routes: Routes = [
  { path: '', component: SearchListComponent },
  { path: 'search', component: SearchListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
