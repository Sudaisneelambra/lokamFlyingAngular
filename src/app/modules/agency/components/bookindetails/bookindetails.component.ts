import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { agencyService } from "../../services/agency.service";

@Component({
    selector:'app-booking',
    templateUrl:'./bookindetails.component.html',
    styleUrls:['./bookindetails.component.css']
})

export class BookingComponent implements OnInit,OnDestroy{
    
 

    bookings:any
    booking$ = new Subscription()

    constructor (private agencycommon:agencyService) {}

    ngOnInit(): void {
        this.booking$ = this.agencycommon.getbooking().subscribe({
            next:(res)=>{
                this.bookings=res.data
                console.log(this.bookings);
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    gotoagency(id:any){

    }

    gotopackage(id:any){

    }

    ngOnDestroy(): void {
    }

}