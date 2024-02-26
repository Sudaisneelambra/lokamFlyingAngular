import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { agencyService } from "src/app/modules/agency/services/agency.service";
import { GuideService } from "src/app/modules/agency/services/guid.service";

@Component({
    selector:'app-guiddetails',
    templateUrl:'./guidedetails.component.html',
    styleUrls:['./guidedetails.component.css']
})

export class guidedetails {
     
    singleguidedetails$ = new Subscription();
    singleguide!: any;
    
    // injecting services
    constructor(
      private guideservice: GuideService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private agencyservice:agencyService
    ) {}

// getting full details
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.singleguidedetails$ = this.guideservice.getsingleguide(id).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login');
            this.agencyservice.agencylogout();
          } else {
            this.singleguide = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // back to previous location
  back() {
    this.location.back();
  }

//   page distroy
  ngOnDestroy(): void {
    this.singleguidedetails$?.unsubscribe();
  }
}