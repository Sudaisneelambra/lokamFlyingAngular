import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHome } from "../components/adminhome.component";
import { UserList } from "../components/userlist/userlist.component";
import { AgencyList } from "../components/agencylist/agencylist.component";
import { blockedagency } from "../components/blockedagency/blockedagency.component";
import { RequestComponent } from "../components/requests/request.component";
import { Blockeduser } from "../components/blockedusers/blockedusers.component";
import { AgencyFullDetails } from "../components/agencyfulldetails/agencyfulldetails.component";
import { Packages } from "../components/packges/packages.component";
import { PlacesComponent } from "../components/places/places.component";


const routes: Routes = [
    {
      path: '',
      component: AdminHome,
      children:[
        {
            path:'user-list',
            component:UserList
        },
        {
            path:'agency-list',
            component:AgencyList
        },
        {
            path:'blocked-agency',
            component:blockedagency
        },
        {
            path:'blocked-user',
            component:Blockeduser
        },
        {
            path:'requests',
            component:RequestComponent
        },
        {
            path:'agencydetails/:id',
            component:AgencyFullDetails
        },
        {
            path:'packages',
            component:Packages
        },
        {
            path:'places',
            component:PlacesComponent
        }
      ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

export class AgencyRoutes {}