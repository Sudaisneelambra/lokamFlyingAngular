import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';
import { useservice } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { UserPackageService } from '../../services/packageservice.service';
import { UserPlaceService } from '../../services/placeservice.service';
import { UserAgencyService } from '../../services/agencyservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  places: any;
  packages: any;
  agencies: any;
  placeget$ = new Subscription();
  packageget$ = new Subscription();
  agencyget$ = new Subscription();

  constructor(
    private router: Router,
    private service: useservice,
    private userpackage: UserPackageService,
    private userplace: UserPlaceService,
    private useragency: UserAgencyService
  ) {}

  ngOnInit(): void {
    this.packageget$ = this.userpackage.gettingpackages().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.userlogout();
        } else {
          if (res.success) {
            this.packages = res.data;
            console.log(this.packages);
          } else {
            console.log(res.message);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.placeget$ = this.userplace.gettingplace().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.userlogout();
        } else {
          if (res.success) {
            this.places = res.data;
            console.log(this.places);
          } else {
            console.log(res.message);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });


    this.agencyget$ = this.useragency.gettingagencies().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.userlogout();
        } else {
          if (res.success) {
            this.agencies = res.data;
          } else {
            console.log(res.message);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
  ngOnDestroy(): void {
    this.packageget$?.unsubscribe();
    this.placeget$?.unsubscribe();
    this.agencyget$?.unsubscribe()
  }
}
