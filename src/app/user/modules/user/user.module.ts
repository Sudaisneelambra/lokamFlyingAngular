import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from '../../signup/signup/signup.component';
import { UserService } from '../../user.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[SignupComponent],
  providers:[UserService]
})
export class UserModule { }
