import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TComponent } from './components/t/t.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
 // { path: '', component: TComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'front', loadChildren: () => import('./modules/front/front.module').then(m => m.FrontModule) },
  { path: 'panel', loadChildren: () => import('./modules/panel/panel.module').then(m => m.PanelModule) },
  { path: 't', component: TComponent, pathMatch: 'full'  },
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
