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
    data:any
    packageget$ = new Subscription()
    bool=false

    constructor(private userpackage:UserPackageService, private service:useservice) {}

    ngOnInit(): void {
      this.bool=true
        setTimeout(() => {
          this.bool=false
          this.packageget$ = this.userpackage.gettingpackages().subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired or internal error please login');
                this.service.userlogout();
              } else {
                if (res.success) {
                  this.packages = res.data;
                  this.data=this.packages
                } else {
                  console.log(res.message);
                }
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
        }, 3500);

          
    }

    filtering(event:any){
       if(event==='all'){
            this.packages=this.data
       }else{  
            let values = event.split("-")
            this.packages= this.data.filter((filter:any)=>{
                return filter.packagePrice >= parseInt(values[0]) && filter.packagePrice <= parseInt(values[1])
            }) 
       }

        
    }

    ngOnDestroy(): void {
        this.packageget$?.unsubscribe()
    }
    
}