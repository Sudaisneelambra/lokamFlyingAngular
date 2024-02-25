import { Component, OnDestroy, OnInit } from "@angular/core";
import { userlist } from "../../services/userlist.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { admincommon } from "../../services/admincommon.service";

@Component({
    selector:'app-userlist',
    templateUrl:'./userlist.component.html',
    styleUrls:['./userlist.component.css']
})

export class UserList implements OnInit,OnDestroy{
    
    userlistget$=new Subscription()
    modalview=false
    blockid!:any

    data!:any
    constructor(private adminuserlist:userlist, private router:Router, private service:admincommon){}
    
    ngOnInit(): void {
        this.userlistget$ =this.adminuserlist.getuserlist().subscribe({
            next:(res)=>{
                if(res.expiry){
                    alert('session expired or internal error please login')
                    this.service.agencylogout()
                   } else{
                       this.data=res.userlist
                       console.log(this.data);
                    }
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }

    blockuser(id:any){
        this.blockid=id
        this.modalview=true
    }

    cancelling(event:any){
        this.modalview=event
    }
    
    ngOnDestroy(): void {
      this.userlistget$?.unsubscribe()
    }

    

}