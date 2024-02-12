import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SiteServiceComponent } from './components/homepage/site-service/site-service.component';
import { TrendingAgencyComponent } from './components/homepage/trending-agency/trending-agency.component';
import { PopularPlacesComponent } from './components/homepage/popular-places/popular-places.component';
import { PopularPackagesComponent } from './components/homepage/popular-packages/popular-packages.component';
import { BannerComponent } from './components/homepage/banner/banner.component';
import { AboutAgenncyComponent } from './components/homepage/about-agenncy/about-agenncy.component';
import { FooterComponent } from './components/homepage/footer/footer.component';
import { UserRoutes } from './routes/user.routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// const routes:Routes=[
//   {
//       path:'',
//       component:HomepageComponent
//   }
// ]

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
  ],
  imports: [CommonModule, UserRoutes, HttpClientModule],
  exports: [],
  providers: [],
})
export class UserModule {}
