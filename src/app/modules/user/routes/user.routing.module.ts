import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { HomepageComponent } from "../components/homepage/homepage.component";
import { goToAuthGuard } from "src/app/guards/gotohome.guard";

const routes:Routes=[
    {
        path:'',
        canActivate:[goToAuthGuard],
        component:HomepageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports :[RouterModule]
})

export class UserRoutes{

}