import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserPackageService } from "../../services/packageservice.service";
import { useservice } from "../../services/user.service";

@Component({
    selector:'app-packages',
    templateUrl:'./packages.component.html',
    styleUrls:['./packages.component.css']
})

export class PackagesComponent implements OnInit, OnDestroy{


    packages:any
    packageget$ = new Subscription()

    constructor(private userpackage:UserPackageService, private service:useservice) {}

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

    }


    ngOnDestroy(): void {
        this.packageget$?.unsubscribe()
    }
    
}