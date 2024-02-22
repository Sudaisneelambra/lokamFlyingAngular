import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyRoutes } from './routes/agency-routing.module';
import { ProfileAddComponent } from './components/profile-add/profile-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EditConformation } from './components/agency-home/places/placesfulldetails/editconformation/editconformation.component';
import { DeleteConformation } from './components/agency-home/places/placesfulldetails/deleteconformation/deleteconformation.component';
import { GuideDeleteConformation } from './components/agency-home/guide/guidefulldetails/guidedeleteconformation/guidedeleteconformation.component';
import { GuideEditConfirmationComponent } from './components/agency-home/guide/guidefulldetails/guideeditconfirmation/guideeditconfirmation.component';
import { PackagefullComponent } from './components/agency-home/package/packagefulldetails/packagefulldetails.component';
import { PackageDeleteConformation } from './components/agency-home/package/packagefulldetails/packagedeleteconformation/packagedeleteconformation.component';
import { PackageEditConfirmationComponent } from './components/agency-home/package/packagefulldetails/packageeditconfirmation/packageeditconfirmation.component';
import { StrictDelete } from './components/agency-home/places/placesfulldetails/deleteconformation/strictdelete/strictdelete.component';
import { StrictDeleteGuid } from './components/agency-home/guide/guidefulldetails/guidedeleteconformation/strictdeleteguid/strictdeleteguid.component';

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
    GuideFulldetailes,
    EditConformation,
    DeleteConformation,
    GuideDeleteConformation,
    GuideEditConfirmationComponent,
    PackagefullComponent,
    PackageDeleteConformation,
    PackageEditConfirmationComponent,
    StrictDelete,
    StrictDeleteGuid
    ],
  imports: [CommonModule,AgencyRoutes, ReactiveFormsModule, HttpClientModule, FormsModule],
  exports: [],
  providers: [],
})
export class agencyModule {}
