import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserWishlistService } from "../../services/userwishlist.service";
import { useservice } from "../../services/user.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

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

    constructor(private wishlistservice:UserWishlistService, private service:useservice,private location:Location, private router:Router){}

    ngOnInit(): void {
        this.wishlist$ = this.wishlistservice.getwishlist().subscribe({
            next:(res)=>{
                if (res.expiry) {
                    alert('session expired or internal error please login');
                    this.service.userlogout();
                  } else {
                    if(res.success){
                        this.wishitem=res.data
                        console.log(this.wishitem);
                    } else{
                        console.log(res.message);  
                    }
                  }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }
    gotopackage(id:any){
        console.log(id);
        
        this.router.navigate(['/user/singlepackage',id])
    }

    back(){
        this.location.back()
    }

    remove(id:any){
        this.bool=true
        this.removeid=id
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
    }

}