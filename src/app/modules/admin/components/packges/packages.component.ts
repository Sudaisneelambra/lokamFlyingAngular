import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { admincommon } from "../../services/admincommon.service";
import { packagelistservice } from "../../services/packages.service";
import { Router } from "@angular/router";

@Component({
    selector:'app-package',
    templateUrl:'./packages.component.html',
    styleUrls:['./packages.component.css']
})

export class Packages implements OnInit, OnDestroy{

    data:any
    packages$ =new Subscription()
    package: any;
    blockid:any
    unblockid:any
    modalview=false
    modalviewun=false

    constructor(private packageservice: packagelistservice, private service:admincommon, private router:Router) {}

    ngOnInit(): void {
        this.packages$ = this.packageservice.gettingpackages().subscribe({
            next:(res)=>{
                if(res.expiry){
                    alert('session expired or internal error please login')
                    this.service.agencylogout()
                   } else{
                        this.package = res.data;
                   }
            },
            error:(err)=>{
                console.log(err);
            }
        })
    }
    
    blockpackage(id:any){     
        this.modalview=true
        this.blockid =id
    }
    unblockpackage(id:any){
        this.modalviewun=true
        this.unblockid=id
    }

    cancelling(event:any){
        this.modalview=event
    }
    cancellingun(event:any){
        this.modalviewun=event
    }

    gettingsinglepackage(id:any){
        this.router.navigate(['/admin/packagefulldetails',id])
    }

    ngOnDestroy(): void {
        this.packages$?.unsubscribe()
    }

}