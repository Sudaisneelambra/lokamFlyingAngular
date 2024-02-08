import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { backtoLoginAuthGuard } from './guards/backtologin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    canActivate:[backtoLoginAuthGuard],
    component:LoginComponent,
  },
  {
    path:'authentication',
    canActivate:[backtoLoginAuthGuard],
    component:LoginComponent
  },
  {
    path:'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  {
    path:'**',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
