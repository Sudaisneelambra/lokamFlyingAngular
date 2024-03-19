import { Component } from "@angular/core";
import { agencylist } from "../../services/agencylist.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { admincommon } from "../../services/admincommon.service";

@Component({
    selector:'app-agencylist',
    templateUrl:'./agencylist.component.html',
    styleUrls:['./agencylist.component.css']
})

export class AgencyList{
    
    agencylist$=new Subscription()
    data!:any
    modalview=false
    blockid:any
    constructor(private adminagencylist:agencylist, private router:Router, private service:admincommon){}
    
    ngOnInit(): void {
        this.agencylist$ =this.adminagencylist.getagencylist().subscribe({
            next:(res)=>{
               if(res.expiry){
                alert('session expired or internal error please login')
                this.service.agencylogout()
               } else{
                this.data=res.list
               }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    block(id:any){
        this.blockid=id
        this.modalview=true
    }

    cancelling(event:any){
        this.modalview=event
    }

    fulldetails(id:any){
        this.router.navigate(['/admin/agencydetails',id])
    }
    
    ngOnDestroy(): void {
      this.agencylist$?.unsubscribe()
    }
}