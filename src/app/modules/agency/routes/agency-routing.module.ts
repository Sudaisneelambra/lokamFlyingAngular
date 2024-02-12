import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileAddComponent } from '../components/profile-add/profile-add.component';
import { AgencyHomeComponent } from '../components/agency-home/agency-home.component';
import { gotoagencyhome } from 'src/app/guards/agencyhome.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [gotoagencyhome],
    component: AgencyHomeComponent,
  },
  {
    path: 'profileadd',
    canActivate: [gotoagencyhome],
    component: ProfileAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyRoutes {}
