import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserWishlistService } from "../../services/userwishlist.service";
import { useservice } from "../../services/user.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { userprofileservice } from "../../services/profile.service";

@Component({
    selector:'app-wishlist',
    templateUrl:'./wishlist.component.html',
    styleUrls:['./wishlist.component.css']
})

export class WishlistComponent implements OnInit,OnDestroy{

    wishitem:any
    wishlist$ = new Subscription()
    bool=false
    removeid:any
    message:any
    userprof$ = new Subscription()
    userdata: any;

    constructor(private wishlistservice:UserWishlistService, private service:useservice,private location:Location, private router:Router, private userprofile:userprofileservice){}

    ngOnInit(): void {
    window.scrollTo(0, 0);

        this.wishlist$ = this.wishlistservice.getwishlist().subscribe({
            next:(res)=>{
                if (res.expiry) {
                    alert('session expired or internal error please login');
                    this.service.userlogout();
                  } else {
                    if(res.success){
                        this.wishitem=res.data
                    } else{
                    }
                  }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })

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
    }
    gotopackage(id:any){
        this.router.navigate(['/user/singlepackage',id])
    }

    back(){
        this.location.back()
    }

    remove(id:any){
        this.bool=true
        this.removeid=id
    }

    isExpired(date:any){
      if(new Date(date)<new Date()){
        return true    
      }else{
        return false
      }
    }

    cancelling(event:any){
        this.bool=event
    }
    messages(event:any){
        this.message=event
        setTimeout(()=>{
            this.message=''
        },3000)
    }

    ngOnDestroy(): void {
        this.wishlist$?.unsubscribe()
        this.userprof$?.unsubscribe()
    }

}