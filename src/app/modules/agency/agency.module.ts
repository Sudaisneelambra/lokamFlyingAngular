import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyRoutes } from './routes/agency-routing.module';
import { ProfileAddComponent } from './components/profile-add/profile-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PackageAddComponent } from './components/package-add/package-add.component';
import { PlaceAddComponent } from './components/place-add/place-add.component';
import { GuideAddComponent } from './components/guide-add/guide-add.component';
import { PlaceComponent } from './components/agency-home/places/place.component';
import { AgencyHomeComponent } from './components/agency-home/agency-home.component';
import { GuideComponent } from './components/agency-home/guide/guide.component';
import { PackageComponent } from './components/agency-home/package/package.component';
import { PlacePipe } from './pipes/placename.pipe';
import { PlaceDiscriptionPipe } from './pipes/placeDiscription.pipe';
import { guideDiscriptionPipe } from './pipes/guideDiscription.pipe';
import { PlaceFulldetails } from './components/agency-home/places/placesfulldetails/placesfulldetails.component';
import { AgencyMainHome } from './components/home.component';
import { GuideFulldetailes } from './components/agency-home/guide/guidefulldetails/guidefulldetails.component';

@NgModule({
  declarations: [
    ProfileAddComponent,
    PackageAddComponent,
    PlaceAddComponent,
    GuideAddComponent,
    PlaceComponent,
    AgencyHomeComponent,
    GuideComponent,
    PackageComponent,
    PlacePipe,
    PlaceDiscriptionPipe,
    guideDiscriptionPipe,
    PlaceFulldetails,
    AgencyMainHome,
    GuideFulldetailes
    ],
  imports: [CommonModule,AgencyRoutes, ReactiveFormsModule, HttpClientModule],
  exports: [],
  providers: [],
})
export class agencyModule {}
