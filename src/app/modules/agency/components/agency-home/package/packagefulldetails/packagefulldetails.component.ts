import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { agencyService } from "src/app/modules/agency/services/agency.service";

@Component({
    selector:'app-fullpackage',
    templateUrl:'./packagefulldetails.component.html',
    styleUrls:['./packagefulldetails.component.css']
})

export class PackagefullComponent implements OnInit{

    singlepackagedetails$!:Subscription
    singlepackage!:any
    places: any;
    
    constructor(private rout:ActivatedRoute ,private service:agencyService){}
    ngOnInit(): void {
        this.rout.params.subscribe(params=>{
            const id=params['id']
            this.singlepackagedetails$=this.service.getsinglepackage(id).subscribe({
                next:(res)=>{
                    this.singlepackage=res.package
                    this.places=res.place
                    console.log(this.singlepackage);
                    console.log(this.places);  
                },
                error:(err)=>{
                    console.log(err);
                }
            })
        })
    }


}