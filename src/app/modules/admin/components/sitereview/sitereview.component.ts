import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { useservice } from "src/app/modules/user/services/user.service";

@Component({
    selector:'app-WebSiteReview',
    templateUrl:'./sitereview.component.html',
    styleUrls:['./sitereview.component.css']
})

export class WebSiteReview implements OnInit, OnDestroy{

    review$ = new Subscription()
    reviewdata:any

    constructor(private service:useservice) {}


    ngOnInit(): void {
        this.review$ = this.service.gettingpagereview().subscribe({
            next:(res)=>{
                this.reviewdata=res.data   
                console.log(this.reviewdata);
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }
    ngOnDestroy(): void {
        this.review$?.unsubscribe()
    }



}