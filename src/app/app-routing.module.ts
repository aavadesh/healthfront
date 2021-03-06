import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OnepageComponent } from './components/onepage/onepage.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'onepage', component: OnepageComponent  },
  { path: 'front', loadChildren: () => import('./modules/front/front.module').then(m => m.FrontModule) },
  { path: 'panel', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule) },
  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
