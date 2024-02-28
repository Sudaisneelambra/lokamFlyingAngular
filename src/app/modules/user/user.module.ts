import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SiteServiceComponent } from './components/homepage/site-service/site-service.component';
import { TrendingAgencyComponent } from './components/homepage/trending-agency/trending-agency.component';
import { PopularPlacesComponent } from './components/homepage/popular-places/popular-places.component';
import { PopularPackagesComponent } from './components/homepage/popular-packages/popular-packages.component';
import { BannerComponent } from './components/homepage/banner/banner.component';
import { AboutAgenncyComponent } from './components/homepage/about-agenncy/about-agenncy.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRoutes } from './routes/user.routing';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BookTour } from './components/booktour/booktour.component';
import { MainHome } from './components/main.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileAdd } from './components/profileadd/profileadd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { agencyabout } from './pipes/agencyabout.pipe';
import { bookingtripcomponent } from './components/bookingtrip/bookingtrip.component';
import { AllPlacesComponent } from './components/places/allplaces.component';
import { MargueInPlaceComponent } from './components/places/marqueeinplaces/marqueeinplaces.component';
import { LokamaPlaceDescriptionComponent } from './components/places/lokamaplacedescription/lokamaplacedescription.component';
import { SinglePlaceComponent } from './components/places/singleplace/singleplace.component';


@NgModule({
  declarations: [
    HomepageComponent,
    SiteServiceComponent,
    TrendingAgencyComponent,
    PopularPlacesComponent,
    PopularPackagesComponent,
    BannerComponent,
    AboutAgenncyComponent,
    FooterComponent,
    BookTour,
    MainHome,
    NavBarComponent,
    ProfileComponent,
    ProfileAdd,
    agencyabout,
    bookingtripcomponent,
    AllPlacesComponent,
    MargueInPlaceComponent,
    LokamaPlaceDescriptionComponent,
    SinglePlaceComponent
  ],
  imports: [CommonModule, UserRoutes, HttpClientModule,ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class UserModule {}
