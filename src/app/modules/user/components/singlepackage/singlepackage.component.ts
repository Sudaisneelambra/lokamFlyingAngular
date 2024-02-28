import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { packageService } from 'src/app/modules/agency/services/package.service';
import { useservice } from '../../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-singlepackage',
  templateUrl: './singlepackage.component.html',
  styleUrls: ['./singlepackage.component.css'],
})
export class SinglePackegeComponent implements OnInit, OnDestroy {
  singlepackage$ = new Subscription();
  singlepackage: any;
  places: any;
  objplace: any;
  guide: any;
  result: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agencypackageservice: packageService,
    private userservice: useservice,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.singlepackage$ = this.agencypackageservice
          .getsinglepackage(id)
          .subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired please login');
                this.userservice.userlogout();
              } else {
                this.singlepackage = res.package;

                this.places = res.place;
                this.objplace = this.singlepackage.places;
                this.guide = res.guide;

                for (let i = 0; i < this.places.length; i++) {
                  for (let j = 0; j < this.places.length; j++) {
                    if (this.places[i]._id === this.objplace[j].placeid) {
                      let joinedObject = {
                        ...this.places[i],
                        ...this.objplace[j],
                      };
                      this.result.push(joinedObject);
                    }
                  }
                }
                console.log(this.result);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
    
  }

  back() {
   this.location.back()
  }

  gotoplaces(id: any) {
    this.router.navigate(['/user/places/singleplace',id])
  }

  ngOnDestroy(): void {
    this.singlepackage$?.unsubscribe();
  }
}
