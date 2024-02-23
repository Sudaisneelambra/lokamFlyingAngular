import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { useservice } from 'src/app/modules/user/services/user.service';
import { UserService } from 'src/app/services/commonSignup.service';
import { agencyService } from '../../services/agency.service';
import { Subscription } from 'rxjs';
import { GuideService } from '../../services/guid.service';
import { PlaceService } from '../../services/place.service';
import { packageService } from '../../services/package.service';

@Component({
  selector: 'app-agency-home',
  templateUrl: './agency-home.component.html',
  styleUrls: ['./agency-home.component.css'],
})
export class AgencyHomeComponent implements OnInit, OnDestroy {

  placeSubscription$ = new Subscription();
  guideSubscription$ = new Subscription();
  packageSubscription$ = new Subscription();

  name!: string;
  data: any;
  guide: any;
  package: any;
  booleanvalue: boolean = true;
  expiry!: any;
  profileckecks: any;

  // constructor for injecting services
  constructor(
    private service: agencyService,
    private router: Router,
    private guideservice: GuideService,
    private placeservice: PlaceService,
    private packageservice: packageService
  ) {}

  // on init getting place and guid and package
  ngOnInit() {

    // all place getting api
    this.placeSubscription$ = this.placeservice.gettingplace().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login')
          this.service.agencylogout()
        } else {
          this.data = res.data;
        }
       
      },
      error: (err) => {
        console.log(err.message);
      },
    });

    //all place getting api
    this.guideSubscription$ = this.guideservice.gettingguides().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login')
          this.service.agencylogout()
        } else {
          this.guide = res.data;
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });

    //all package getting api
    this.packageSubscription$ = this.packageservice
      .gettingpackages()
      .subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else {
          this.package = res.data;
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
  }

  // logout
  logout() {
    // logout and token delete
   this.service.agencylogout()
  }

 

  // page distroying
  ngOnDestroy(): void {
    this.placeSubscription$.unsubscribe();
    this.guideSubscription$.unsubscribe();
    this.packageSubscription$.unsubscribe();
  }
}
