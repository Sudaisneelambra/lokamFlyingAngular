import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/commonSignup.service';
import { HttpClientModule } from '@angular/common/http';
import { OtpComponent } from './components/login/otp/otp.component';
import { UserRoutes } from './modules/user/routes/user.routing.module';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    OtpComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    UserRoutes
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
