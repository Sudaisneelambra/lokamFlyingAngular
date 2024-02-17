import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { agencyService } from "src/app/modules/agency/services/agency.service";

@Component({
    selector:'app-guidfulldetails',
    templateUrl:'./guidefulldetails.component.html',
    styleUrls:['./guidefulldetails.component.css']
})

export class GuideFulldetailes implements OnInit,OnDestroy{

    constructor(private service:agencyService){}
    
    getingguidebehaviour$!:Subscription
    singleguide!:any
    
    ngOnInit(): void {
        this.getingguidebehaviour$= this.service.singleguide.subscribe({
            next:(res)=>{
                this.singleguide=res
                console.log(res);
                console.log(this.singleguide);  
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }


    ngOnDestroy(): void {
        this.getingguidebehaviour$.unsubscribe()
    }
}