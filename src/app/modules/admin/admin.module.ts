import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgencyRoutes } from './routes/admin.routes';
import { AdminHome } from "./components/adminhome.component";
import { UserList } from "./components/userlist/userlist.component";
import { AgencyList } from "./components/agencylist/agencylist.component";
import { BlockedAngency } from "./components/blockedagency/blockedagency.component";
import { Blockeduser } from "./components/blockedusers/blockedusers.component";
import { RequestComponent } from "./components/requests/request.component";


@NgModule({
    declarations:[
        AdminHome,
        UserList,
        AgencyList,
        BlockedAngency,
        Blockeduser,
        RequestComponent
    ],
    imports:[CommonModule,AgencyRoutes],
    providers:[]
})

export class AdminModule{

}