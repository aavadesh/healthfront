import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TestPageComponent } from './components/test-page/test-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'testpage', component: TestPageComponent },
];

const appRoutes: Routes = [
  { path: 'home', loadChildren: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'testpage', loadChildren: () => import('./components/test-page/test-page.component').then(m => m.TestPageComponent) },
  { path: 'search', loadChildren: () => import('./components/search/search.component').then(m => m.SearchComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
