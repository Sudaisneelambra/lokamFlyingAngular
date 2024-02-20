import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileAddComponent } from '../components/profile-add/profile-add.component';
import { AgencyHomeComponent } from '../components/agency-home/agency-home.component';
import { gotoagencyhome } from 'src/app/guards/agencyhome.guard';
import { PackageAddComponent } from '../components/package-add/package-add.component';
import { PlaceAddComponent } from '../components/place-add/place-add.component';
import { GuideAddComponent } from '../components/guide-add/guide-add.component';
import { PlaceFulldetails } from '../components/agency-home/places/placesfulldetails/placesfulldetails.component';
import { AgencyMainHome } from '../components/home.component';
import { GuideFulldetailes } from '../components/agency-home/guide/guidefulldetails/guidefulldetails.component';
import { PackagefullComponent } from '../components/agency-home/package/packagefulldetails/packagefulldetails.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyMainHome,
    children:[
        {
          path:'home',
          component:AgencyHomeComponent
        },
        {
          path: 'profileadd',
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
          path:'placedetails/:id',
          component:PlaceFulldetails
        },
        {
          path:'guidedetails/:id',
          component:GuideFulldetailes
        },
        {
          path:'packagedetails/:id',
          component:PackagefullComponent
        },
    ]
  },


 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyRoutes {}
