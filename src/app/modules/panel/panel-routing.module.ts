import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'author', loadChildren: () => import('./components/author/author.module').then(m => m.AuthorModule) },
  { path: 'bookContent', loadChildren: () => import('./components/bookcontent/bookcontent.module').then(m => m.BookcontentModule) },
  { path: 'category', loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule) },
  { path: 'book', loadChildren: () => import('./components/book/book.module').then(m => m.BookModule) },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
