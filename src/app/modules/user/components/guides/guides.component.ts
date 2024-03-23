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
    data:any
    gude$ = new Subscription()
    agencies:any
    lengths:any
    
    constructor(private service:useservice){}

    ngOnInit(): void {
    window.scrollTo(0, 0);

        this.gude$ =this.service.getguide().subscribe({
            next:(res)=>{
                if (res.expiry) {
                    alert('session expired or internal error please login');
                    this.service.userlogout();
                  } else {
                    if(res.success){
                        this.guide=res.data
                        this.data=res.data
                        this.agencies=res.data
                        
                    } else{
                        
                    }
                  }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    filtering(event:any){
        if(event=='all'){
            this.guide=this.data
        } else{
            this.guide=this.data.filter((m:any)=>{
                return m.agencydetails[0].name == event
            })  
        }

    }

    searching(query:any){

        if (query.trim() !== '') {
          this.guide = this.guide.filter((guid:any)=>{
           return  guid.guidename.toLowerCase().includes(query.toLowerCase())
            
          })
        } else{
            
          this.guide=this.data
        }
      }

    ngOnDestroy(): void {
        this.gude$?.unsubscribe()
    }

}