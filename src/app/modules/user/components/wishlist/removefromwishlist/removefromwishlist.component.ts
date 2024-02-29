import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { UserWishlistService } from "../../../services/userwishlist.service";
import { useservice } from "../../../services/user.service";
import { Subscription } from "rxjs";
import { NavigationExtras, Router } from "@angular/router";

@Component({
    selector:'app-remove',
    templateUrl:'./removefromwishlist.component.html',
    styleUrls:['./removefromwishlist.component.css']
})

export class RemoveWishlistComponent implements OnInit,OnDestroy{
   

    @Input() id:any
    @Output() canceling= new EventEmitter()
    @Output() msg= new EventEmitter()

    wishlistremove$ = new Subscription()

    constructor(private wishlistservice:UserWishlistService,private service:useservice,private router:Router){}
    
    ngOnInit(): void {
    }

    cancel(){
        this.canceling.emit(false)
    }
    confirmboolean(){
        this.wishlistremove$ = this.wishlistservice.removewishlist(this.id).subscribe({
            next:(res)=>{
                if (res.expiry) {
                    alert('session expired or internal error please login');
                    this.service.userlogout();
                  } else {
                    this.canceling.emit(false)
                    if(res.success){
                        this.msg.emit(res.message)
                        setTimeout(() => {
                            this.router.navigateByUrl('/user', { skipLocationChange: true }).then(() => {
                                // Navigate back to the original route
                                this.router.navigate(['/user/wishlist']);
                            });
                        }, 2000);
                    } else{
                        this.msg.emit(res.message)
                    }
                    
                  }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })

    }

    ngOnDestroy(): void {
        this.wishlistremove$?.unsubscribe()
    }
}