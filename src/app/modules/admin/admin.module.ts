import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgencyRoutes } from './routes/admin.routes';
import { AdminHome } from "./components/adminhome.component";
import { UserList } from "./components/userlist/userlist.component";
import { AgencyList } from "./components/agencylist/agencylist.component";


@NgModule({
    declarations:[
        AdminHome,
        UserList,
        AgencyList
    ],
    imports:[CommonModule,AgencyRoutes],
    providers:[]
})

export class AdminModule{

}