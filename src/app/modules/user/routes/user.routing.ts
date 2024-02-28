import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from '../components/homepage/homepage.component';
import { BookTour } from '../components/booktour/booktour.component';
import { MainHome } from '../components/main.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileAdd } from '../components/profileadd/profileadd.component';
import { bookingtripcomponent } from '../components/bookingtrip/bookingtrip.component';
import { AllPlacesComponent } from '../components/places/allplaces.component';
import { LokamaPlaceDescriptionComponent } from '../components/places/lokamaplacedescription/lokamaplacedescription.component';
import { SinglePlaceComponent } from '../components/places/singleplace/singleplace.component';

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
      },
      {
        path:'bookng-trip',
        component:bookingtripcomponent
      },
      {
        path:'places',
        component:AllPlacesComponent,
        children:[
          {
            path:'lokamdescription',
            component:LokamaPlaceDescriptionComponent
          },
          {
            path:'singleplace/:id',
            component:SinglePlaceComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutes {}
