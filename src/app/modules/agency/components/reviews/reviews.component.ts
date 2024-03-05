import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { agencyService } from "../../services/agency.service";

@Component({
    selector:'app-review',
    templateUrl:'./reviews.component.html',
    styleUrls:['./reviews.component.css']
})

export class ReviewComponent implements OnInit,OnDestroy{
    
    reviewdata:any
    review$ = new Subscription()
    constructor (private agencycommon:agencyService){}
    
    ngOnInit(): void {
        this.review$ =this.agencycommon.getreview().subscribe({
            next:(res)=>{
                this.reviewdata = res.data
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }
    ngOnDestroy(): void {
    }



}