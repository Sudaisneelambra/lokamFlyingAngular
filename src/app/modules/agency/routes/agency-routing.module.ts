import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { ProfileAddComponent } from "../components/profile-add/profile-add.component";
import { goToAuthGuard } from "src/app/guards/gotohome.guard";

const routes:Routes=[
    {
        path:'profileadd',
        canActivate:[goToAuthGuard],
        component:ProfileAddComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports :[RouterModule]
})

export class AgencyRoutes{

}