import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { packageService } from "src/app/modules/agency/services/package.service";
import { admincommon } from "../../services/admincommon.service";
import { Location } from "@angular/common";

@Component({
    selector:'app-packagefulldetails',
    templateUrl:'./packagefulldetails.component.html',
    styleUrls:['./packagefulldetails.component.css']
})

export class packagefulldetails implements OnInit ,OnDestroy{

    guide:any
    result: any[] = [];
    singlepackage:any
    singlepackagegetting$ = new Subscription()
    places: any;
    objplace: any;

    constructor(private agencypackageservice: packageService, private rout:ActivatedRoute ,private service:admincommon, private location:Location, private router:Router) {}


    ngOnInit(): void {
        
        this.rout.params.subscribe((params)=>{
            const id= params['id']
            this.singlepackagegetting$ = this.agencypackageservice.getsinglepackage(id).subscribe({
                next: (res) => {
                    if (res.expiry) {
                      alert('session expired please login');
                      this.service.agencylogout();
                    } else if(!res.success){
                        this.router.navigate(['/error'])
                    } else {
                      this.singlepackage = res.package;
                      
                      this.places = res.place;
                      this.objplace = this.singlepackage.places;
                      this.guide = res.guide;
                      
                      for(let i=0; i< this.places.length; i++){
                        for(let j=0; j<this.places.length;j++){
                          if(this.places[i]._id === this.objplace[j].placeid){
                            let joinedObject = { ...this.places[i], ...this.objplace[j] };
                            this.result.push(joinedObject);
                          }
                        }
                      }
                    }
                  },
                  error: (err) => {
                    console.log(err);
                  },
            })
            
        })
        
    }

    back(){
        this.location.back()
    }

    ngOnDestroy(): void {
        this.singlepackagegetting$?.unsubscribe()
    }

   
}