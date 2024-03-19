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
  
  constructor(private userservice: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userservice.isLoggedIn()) {
      return true; // User not logged in, allow access
    } else if (this.userservice.type.type==='user') {
      this.router.navigate(['user']);
      return false; // User is of type 'user', deny access
    } else if (this.userservice.type.type==='agency') {
      this.router.navigate(['agency/home']);
      return false; // User is of type 'agency', deny access
    } else if (this.userservice.type.type==='admin') {
      this.router.navigate(['/admin']);
      return false; // User is of type 'agency', deny access
    }
    return false; // Fallback return statement
  }
}
