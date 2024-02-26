import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { BookTour } from '../components/booktour/booktour.component';
import { MainHome } from '../components/main.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileAdd } from '../components/profileadd/profileadd.component';

const routes: Routes = [
  {
    path: '',
    component: MainHome,
    children:[
      {
        path:'home',
        component:HomepageComponent
      },
      {
        path:'booktour',
        component:BookTour
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'profileadd',
        component:ProfileAdd
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutes {}
