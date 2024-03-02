import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { useservice } from "../../services/user.service";

@Component({
    selector:'app-guides',
    templateUrl:'./guides.component.html',
    styleUrls:['./guides.component.css']
})

export class guidesComponent implements OnInit, OnDestroy{

    guide:any
    gude$ = new Subscription()
    agencies:any
    
    constructor(private service:useservice){}

    ngOnInit(): void {
        this.gude$ =this.service.getguide().subscribe({
            next:(res)=>{
                if (res.expiry) {
                    alert('session expired or internal error please login');
                    this.service.userlogout();
                  } else {
                    if(res.success){
                        this.guide=res.data
                        console.log(this.guide);
                        this.agencies=res.data
                        
                    } else{
                        console.log(res.message);
                        
                    }
                  }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    searching(input:any){

    }
    back(){

    }
    ngOnDestroy(): void {
        this.gude$?.unsubscribe()
    }

}