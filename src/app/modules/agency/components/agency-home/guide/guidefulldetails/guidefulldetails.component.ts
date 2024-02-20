import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { agencyService } from "src/app/modules/agency/services/agency.service";

@Component({
    selector:'app-guidfulldetails',
    templateUrl:'./guidefulldetails.component.html',
    styleUrls:['./guidefulldetails.component.css']
})

export class GuideFulldetailes implements OnInit,OnDestroy{

    constructor(private service:agencyService, private route:ActivatedRoute, private router:Router ,private location:Location){}
    
    singleguidedetails$ = new Subscription
    singleguide!:any
    msg!:string
    modalview!:any
    modalviewedit!:any
    deleteId!:any
    editId!:any
    
    ngOnInit(): void {
        this.route.params.subscribe(params=>{
            const id=params['id']
            this.singleguidedetails$=this.service.getsingleguide(id).subscribe({
                next:(res)=>{
                    this.singleguide=res.data
                    console.log(res);
                    console.log(this.singleguide);  
                },
                error:(err)=>{
                    console.log(err);
                }
            })
        })
    }

    // deleteing guide 
    delete(id:any){
        this.modalview=true
        this.deleteId=id
    }

    cancelling(event:any){
        this.modalview=event
    }

    message(event:any){
        this.msg=event
    }

    // edit button triggered
  edit(id:any){
    this.modalviewedit=true
    this.editId=id
   
  }

  modalclose(event:any){
    this.modalviewedit=event
  }

    // back to previous location
    back(){
        this.location.back()
    }
    ngOnDestroy(): void {
        this.singleguidedetails$.unsubscribe()
    }
}




