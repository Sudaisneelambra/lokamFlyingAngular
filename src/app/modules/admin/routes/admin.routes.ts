import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHome } from "../components/adminhome.component";
import { UserList } from "../components/userlist/userlist.component";
import { AgencyList } from "../components/agencylist/agencylist.component";


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
        }
      ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

export class AgencyRoutes {}