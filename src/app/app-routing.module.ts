import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnepageComponent } from './components/onepage/onepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'front', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'front', loadChildren: () => import('./modules/front/front.module').then(m => m.FrontModule) },
  { path: 'panel', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule) },
  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
