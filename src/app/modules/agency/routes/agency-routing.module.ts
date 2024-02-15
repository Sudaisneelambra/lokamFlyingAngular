import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileAddComponent } from '../components/profile-add/profile-add.component';
import { AgencyHomeComponent } from '../components/agency-home/agency-home.component';
import { gotoagencyhome } from 'src/app/guards/agencyhome.guard';
import { PackageAddComponent } from '../components/package-add/package-add.component';
import { PlaceAddComponent } from '../components/place-add/place-add.component';
import { GuideAddComponent } from '../components/guide-add/guide-add.component';
import { PlaceComponent } from '../components/agency-home/places/place.component';

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
  {
    path:'packageadd',
    component:PackageAddComponent
  },
  {
    path:'placeadd',
    component:PlaceAddComponent
  },
  {
    path:'guideadd',
    component:GuideAddComponent
  },
  {
    path:'place',
    component:PlaceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyRoutes {}
