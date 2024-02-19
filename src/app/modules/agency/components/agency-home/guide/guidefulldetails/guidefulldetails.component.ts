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
        const confirmed = confirm('Are you sure you want to delete?');
        if(confirmed){
         // deleting place from database
         this.service.deletingGuide(id).subscribe({
             next:(res)=>{
                 if(res.success){
                     this.msg=res.message
                     setTimeout(() => {
                         this.msg=''
                         this.router.navigate(['/agency/home'])
                     }, 2000);
                 }
             },
             error:(err)=>{
               console.log(err);   
             }
         })
        }
    }

    // edit button triggered
  edit(id:any){
    this.router.navigate([`/agency/guideadd`], { queryParams: { id: id } })
  }

    // back to previous location
    back(){
        this.location.back()
    }
    ngOnDestroy(): void {
        this.singleguidedetails$.unsubscribe()
    }
}




