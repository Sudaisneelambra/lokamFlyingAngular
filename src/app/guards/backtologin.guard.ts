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
export class backtoLoginAuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true; // User not logged in, allow access
    } else if (this.authService.gettypeuser()) {
      this.router.navigate(['user']);
      return false; // User is of type 'user', deny access
    } else if (this.authService.gettypeagency()) {
      this.router.navigate(['agency']);
      return false; // User is of type 'agency', deny access
    }
    return false; // Fallback return statement
  }
}
