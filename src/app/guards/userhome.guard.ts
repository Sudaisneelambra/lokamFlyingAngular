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
export class gotouserhome implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.gettypeuser()) {
      return true;
    } else {
      this.router.navigate(['authentication']);
      return false;
    }
  }
}
