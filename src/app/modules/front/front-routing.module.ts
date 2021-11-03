import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TestPageComponent } from './components/test-page/test-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'testpage', component: TestPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
