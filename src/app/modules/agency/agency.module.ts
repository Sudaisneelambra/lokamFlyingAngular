import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyRoutes } from './routes/agency-routing.module';
import { ProfileAddComponent } from './components/profile-add/profile-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PackageAddComponent } from './components/package-add/package-add.component';
import { PlaceAddComponent } from './components/place-add/place-add.component';

@NgModule({
  declarations: [ProfileAddComponent, PackageAddComponent, PlaceAddComponent],
  imports: [CommonModule,AgencyRoutes, ReactiveFormsModule, HttpClientModule],
  exports: [],
  providers: [],
})
export class agencyModule {}
