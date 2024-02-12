import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencyRoutes } from './routes/agency-routing.module';
import { ProfileAddComponent } from './components/profile-add/profile-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProfileAddComponent],
  imports: [AgencyRoutes, ReactiveFormsModule, HttpClientModule],
  exports: [],
  providers: [],
})
export class agencyModule {}
