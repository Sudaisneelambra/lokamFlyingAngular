import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgencyRoutes } from './routes/admin.routes';
import { AdminHome } from "./components/adminhome.component";
import { UserList } from "./components/userlist/userlist.component";
import { AgencyList } from "./components/agencylist/agencylist.component";
import { RequestComponent } from "./components/requests/request.component";
import { HttpClientModule } from "@angular/common/http";
import { userblockconformation } from "./components/userlist/blockconformation/userblock.component";
import { Blockeduser } from "./components/blockedusers/blockedusers.component";
import { unblockconformation } from "./components/blockedusers/unblockconformation/unblockconformation.component";
import { agencyblockconformation } from "./components/agencylist/agencyblockconformation/agencyblockconformation.component";
import { blockedagency } from "./components/blockedagency/blockedagency.component";
import { agencyunblockconformation } from "./components/blockedagency/agencyunblockconformation/agencyunblockconformation.component";
import { approveconformation } from "./components/requests/approveconformation/approveconformation.component";
import { AgencyFullDetails } from "./components/agencyfulldetails/agencyfulldetails.component";
import { CaroselComponet } from "./components/agencyfulldetails/carosel/carosel.component";
import { Packages } from "./components/packges/packages.component";
import { packageblock } from "./components/packges/packageblock/packageblock.component";
import { packageunblock } from "./components/packges/packageunblock copy/packageunblock.component";
import { PlacesComponent } from "./components/places/places.component";
import { guidescomponent } from "./components/guides/guides.component";
import { packagefulldetails } from "./components/packagefulldetails/packagefulldetails.component";
import { guidedetails } from "./components/guidedetails/guidedetails.component";
import { placedetails } from "./components/placedetails/placedetails.component";
import { BookingComponent } from "./components/bookingdetails/bookingdetails.component";


@NgModule({
    declarations:[
        AdminHome,
        UserList,
        AgencyList,
        blockedagency,
        Blockeduser,
        RequestComponent,
        userblockconformation,
        unblockconformation,
        agencyblockconformation,
        agencyunblockconformation,
        approveconformation,
        AgencyFullDetails,
        CaroselComponet,
        Packages,
        packageblock,
        packageunblock,
        PlacesComponent,
        guidescomponent,
        packagefulldetails,
        guidedetails,
        placedetails,
        BookingComponent
    ],
    imports:[CommonModule,AgencyRoutes,HttpClientModule],
    providers:[]
})

export class AdminModule{

}