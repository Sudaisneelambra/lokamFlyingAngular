import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { agencyService } from "src/app/modules/agency/services/agency.service";
import { agencylist } from "../../services/agencylist.service";
import { Location } from "@angular/common";

@Component({
    selector:'app-fulldetailsofagency',
    templateUrl:'./agencyfulldetails.component.html',
    styleUrls:['./agencyfulldetails.component.css']
})

export class AgencyFullDetails implements OnInit,OnDestroy{


    quryparams$ =new Subscription()
    agencyfulldetails$ =new Subscription()
    agency:any

    constructor(private adminagency:agencylist,  private activateroute:ActivatedRoute ,private location:Location) {}

    ngOnInit(): void {
        this.quryparams$ = this.activateroute.params.subscribe((params:any)=>{
            if(params){
                const id =params.id
                this.agencyfulldetails$ =this.adminagency.getagencyfulldetais(id).subscribe({
                    next:(res)=>{
                        this.agency=res.agency
                        console.log(this.agency);
                    },
                    error:(err)=>{

                    }
                })
            }
            
        })
    }

    back(){
        this.location.back()
    }

    ngOnDestroy(): void {
        this.quryparams$?.unsubscribe()
    }

}