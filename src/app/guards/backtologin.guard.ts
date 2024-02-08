import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/commonSignup.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class backtoLoginAuthGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {}

  canActivate(): boolean {
    if(!this.authService.isLoggedIn()){
      return true
    }else{
      this.router.navigate(['home'])
      return false
    }
  }
};
