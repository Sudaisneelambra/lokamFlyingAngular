import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
  } from '@angular/router';
  import { UserService } from '../services/commonSignup.service';
  import { Observable } from 'rxjs';
  import { Injectable } from '@angular/core';
  
  @Injectable({
    providedIn: 'root',
  })
  export class userguard implements CanActivate {
    
    constructor(private userservice: UserService, private router: Router) {}
  
    canActivate(): boolean {
        if(this.userservice.isLoggedIn() && this.userservice.gettypeuser()){
            return true
        } else if( this.userservice.isLoggedIn() &&  this.userservice.gettypeagency()){
            this.router.navigate(['/agency'])
        } else if (this.userservice.isLoggedIn() &&  this.userservice.gettypeadmin()){
            this.router.navigate(['/admin'])
        } else if (! this.userservice.isLoggedIn()){
          this.router.navigate(['/authentication'])
      }
     return false
    }
  }
  