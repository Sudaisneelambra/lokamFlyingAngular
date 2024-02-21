import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { agencyService } from "src/app/modules/agency/services/agency.service";

@Component({
    selector:'app-fullpackage',
    templateUrl:'./packagefulldetails.component.html',
    styleUrls:['./packagefulldetails.component.css']
})

export class PackagefullComponent implements OnInit ,OnDestroy{

    singlepackagedetails$!:Subscription
    singlepackage!:any
    places: any;
    fulldetails:any
    objplace:any
    guide:any
    result:any[]=[]
    expiry: any;

    modelEdit:any
    modalview:any
    deletedid:any
    editId:any
    message:any
    
    constructor(private rout:ActivatedRoute ,private service:agencyService, private router:Router ,private location:Location){}
    
    ngOnInit(): void {
        this.rout.params.subscribe(params=>{
            const id=params['id']
            this.singlepackagedetails$=this.service.getsinglepackage(id).subscribe({
                next:(res)=>{
                    if(res.expiry){
                        console.log(res.expiry);
                        this.expiry=res.expiry          
                      }  
                    this.singlepackage=res.package
                    this.places=res.place
                    this.objplace=this.singlepackage.places
                    this.guide=res.guide
                    console.log(this.objplace);
                    console.log(this.places); 
                    console.log(this.guide);
                    

                    if (this.objplace.length === this.places.length) {
                         this.result = [];
                    
                        for (let i = 0; i < this.objplace.length; i++) {
                            let joinedObject = {...this.objplace[i], ...this.places[i]};
                            this.result.push(joinedObject);
                        }
                    
                        console.log(this.result);
                    } else {
                        console.log("Arrays a and b must have the same length for joining.");
                    }
                },
                error:(err)=>{
                    console.log(err);
                }
            })
        })
    }

    guideget(id:any){
        console.log(id);
        this.router.navigate([`/agency/guidedetails/${id}`])
    }

    delete(id:any){
        this.modalview=true
        this.deletedid=id
    }
    edit(id:any){
        this.modelEdit=true
        this.editId=id
    }

    back(){
        this.location.back()
    }
    canceldelete(event:any){
        this.modalview=event
    }
    success(event:any){
        this.message=event
    }
    calceledit(event:any){
        this.modelEdit=event
    }

    ngOnDestroy(): void {
        this.singlepackagedetails$.unsubscribe()
    }
}