import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { agencyService } from "../../services/agency.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-booking',
    templateUrl:'./bookindetails.component.html',
    styleUrls:['./bookindetails.component.css']
})

export class BookingComponent implements OnInit,OnDestroy{
    
 

    bookings:any
    booking$ = new Subscription()

    constructor (private agencycommon:agencyService, private router:Router) {}

    ngOnInit(): void {
        this.booking$ = this.agencycommon.getbooking().subscribe({
            next:(res)=>{
                this.bookings=res.data
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    gotopackage(id:any){
        this.router.navigate([`/agency/packagedetails/${id}`]);
    }

    ngOnDestroy(): void {
        this.booking$?.unsubscribe()
    }

}