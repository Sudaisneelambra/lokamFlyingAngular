import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserAgencyService } from "../../services/agencyservice.service";
import { useservice } from "../../services/user.service";

@Component({
    selector:'app-agencies',
    templateUrl:'./agencies.component.html',
    styleUrls:['./agencies.component.css']
})

export class AgneciesComponent implements OnInit, OnDestroy{


    agencyget$= new Subscription()
    agencies: any;

    constructor( private useragency:UserAgencyService, private service:useservice) {}


    ngOnInit(): void {
        this.agencyget$ = this.useragency.gettingagencies().subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired or internal error please login');
                this.service.userlogout();
              } else {
                if (res.success) {
                  this.agencies = res.data;
                  console.log(this.agencies);
                  
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
        this.agencyget$?.unsubscribe()
    }



}