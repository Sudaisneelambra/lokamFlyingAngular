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
import { guidescomponent } from "../components/guides/guides.component";
import { packagefulldetails } from "../components/packagefulldetails/packagefulldetails.component";
import { guidedetails } from "../components/guidedetails/guidedetails.component";
import { placedetails } from "../components/placedetails/placedetails.component";
import { BookingComponent } from "../components/bookingdetails/bookingdetails.component";
import { AgencyReviewComponent } from "../components/agencyreview/agencyreview.component";
import { WebSiteReview } from "../components/sitereview/sitereview.component";
import { MessagingComponent } from "../components/messaging/messaging.component";
import { ChatList } from "../components/chat/chat.component";


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
        },
        {
            path:'guides',
            component:guidescomponent
        },
        {
            path:'packagefulldetails/:id',
            component:packagefulldetails
        },
        {
            path:'guidedetails/:id',
            component:guidedetails
        },
        {
            path:'placedetails/:id',
            component:placedetails
        },
        {
            path:'bookingdetails',
            component:BookingComponent
        },
        {
            path:'agencyreview',
            component:AgencyReviewComponent
        },
        {
            path:'pagereview',
            component:WebSiteReview
        },
        {
            path:'chatlist',
            component:ChatList
        },
        {
            path:'messages/:name',
            component:MessagingComponent
        },
      ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })

export class AgencyRoutes {}