import { Component, OnDestroy, OnInit } from "@angular/core";
import { userprofileservice } from "../../services/profile.service";
import { useservice } from "../../services/user.service";
import { Subscription } from "rxjs";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector:'app-bookingdetails',
    templateUrl:'./bookingdetails.component.html',
    styleUrls:['./bookingdetails.component.css']
})

export class BookingDetailsComponent implements OnInit,OnDestroy{

    userprof$= new Subscription();
    data:any
    userdata:any
    booking$ = new Subscription();
    totalPrice: any;

    

    constructor(private userprofile:userprofileservice, private service:useservice, private location:Location, private router:Router) {}


    ngOnInit(): void {
        this.userprof$ = this.userprofile.getprofile().subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired or internal error please login');
                this.service.userlogout();
              } else {
                if (res.success) {
                  this.userdata = res.data;
                }
              }
            },
            error: (err) => {
              console.log(err);
              console.log(err.error.message );
            },
          });


          this.booking$ = this.service.getbooking().subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired or internal error please login');
                this.service.userlogout();
              } else {
                if (res.success) {
                  this.data = res.data;
                   this.totalPrice = this.data.reduce((total:any, item:any) => total + item.price, 0);
                }
              }
            },
            error: (err) => {
              console.log(err);
              console.log(err.error.message );
            },
          });
    }

    back(){
        this.location.back()
    }

    gottopackage(id:any){
        this.router.navigate(['/user/singlepackage',id])
        
    }

    isExpired(date:any){
      if(new Date(date)<new Date()){
        return true    
      }else{
        return false
      }
    }
    ngOnDestroy(): void {
        this.userprof$?.unsubscribe()
        this.booking$?.unsubscribe()
    }



}