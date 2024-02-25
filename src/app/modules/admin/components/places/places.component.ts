import { Component, OnDestroy, OnInit } from "@angular/core";
import { placesService } from "../../services/adminplace.service";
import { Subscription } from "rxjs";
import { admincommon } from "../../services/admincommon.service";

@Component({
    selector:'app-places',
    templateUrl:'./places.component.html',
    styleUrls:['./places.component.css']
})

export class PlacesComponent implements OnInit,OnDestroy{

    getallplace$ =new Subscription()
    places: any;
    constructor (private placeservice: placesService, private service:admincommon) {}


    ngOnInit(): void {
        this.getallplace$ = this.placeservice.gettingallplaces().subscribe({
            next:(res)=>{
                if(res.expiry){
                    alert('session expired or internal error please login')
                    this.service.agencylogout()
                   } else{
                    console.log(res);
                        this.places = res.data;
                        console.log(this.places);
                        
                   }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    ngOnDestroy(): void {
        this.getallplace$?.unsubscribe()
    }


}