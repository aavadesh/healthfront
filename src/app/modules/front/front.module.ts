import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { TestPageComponent } from './components/test-page/test-page.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    TestPageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule
  ]
})
export class FrontModule { }
