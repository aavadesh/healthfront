import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: 'search', loadChildren: () => import('./components/search/search.module').then(m => m.SearchModule) },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
