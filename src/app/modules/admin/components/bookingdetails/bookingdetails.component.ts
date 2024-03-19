import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { admincommon } from "../../services/admincommon.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-bookingdetails',
    templateUrl:'./bookingdetails.component.html',
    styleUrls:['./bookingdetails.component.css']
})

export class BookingComponent implements OnInit,OnDestroy{

    booking$ = new Subscription()
    bookings:any

    constructor( private service:admincommon, private router:Router){}

    ngOnInit(): void {
        this.booking$ =this.service.getallbooking().subscribe({
            next:(res)=>{
                if (res.expiry) {
                    alert('session expired please login');
                    this.service.agencylogout();
                  } else {
                    this.bookings = res.data;
                    
                  }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    gotoagency(id:any){
        this.router.navigate(['/admin/agencydetails',id])
    }

    gotopackage(id:any){
        this.router.navigate(['/admin/packagefulldetails',id])
    }

    ngOnDestroy(): void {
      this.booking$?.unsubscribe()
    }

}