import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { agencylist } from "../../services/agencylist.service";
import { admincommon } from "../../services/admincommon.service";

@Component({
    selector:'app-blockedagency',
    templateUrl:'./blockedagency.component.html',
    styleUrls:['./blockedagency.component.css']
})

export class blockedagency implements OnInit, OnDestroy{
    
    blockedagency$ = new Subscription()
    data:any
    unblockid:any
    modalview=false

    constructor ( private adminagencylist: agencylist, private service:admincommon) {}



    ngOnInit(): void {
        this.blockedagency$ = this.adminagencylist.getblockedagencylist().subscribe({
            next:(res)=>{
                if(res.expiry){
                 alert('session expired or internal error please login')
                 this.service.agencylogout()
                } else{
                 this.data=res.list
                 console.log(this.data);
                }
             },
             error:(err)=>{
                 console.log(err);
                 
             }
        })
    }

    unblock(id:any){
        this.unblockid=id
        this.modalview=true
    }

    cancelling(event:any){
        this.modalview=event
    }
    ngOnDestroy(): void {
        this.blockedagency$?.unsubscribe()
    }




}