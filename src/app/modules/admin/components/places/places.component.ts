import { Component, OnDestroy, OnInit } from "@angular/core";
import { placesService } from "../../services/adminplace.service";
import { Subscription } from "rxjs";
import { admincommon } from "../../services/admincommon.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-places',
    templateUrl:'./places.component.html',
    styleUrls:['./places.component.css']
})

export class PlacesComponent implements OnInit,OnDestroy{

    getallplace$ =new Subscription()
    places: any;
    constructor (private placeservice: placesService, private service:admincommon, private router:Router) {}


    ngOnInit(): void {
        this.getallplace$ = this.placeservice.gettingallplaces().subscribe({
            next:(res)=>{
                if(res.expiry){
                    alert('session expired or internal error please login')
                    this.service.agencylogout()
                   } else{
                        this.places = res.data;
                        
                   }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }
   
    gettingsingleplace(id:any){
        this.router.navigate(['/admin/placedetails',id])
    }
    
    ngOnDestroy(): void {
        this.getallplace$?.unsubscribe()
    }


}