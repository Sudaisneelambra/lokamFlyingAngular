import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { userlist } from "../../services/userlist.service";
import { admincommon } from "../../services/admincommon.service";

@Component({
    selector:'app-unblock',
    templateUrl:'./blockedusers.component.html',
    styleUrls:['./blockedusers.component.css']
})

export class Blockeduser implements OnDestroy{
   
    blockeuserlistget$=new Subscription()
    data: any;
    modalview=false
    unblockid:any

    constructor(private adminuserlist:userlist, private service:admincommon){}
    
    ngOnInit(): void {
        this.blockeuserlistget$ =this.adminuserlist.getblockeduserlist().subscribe({
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

    unblock(id:any){
        this.modalview=true
        this.unblockid=id
    }
    cancelling(event:any){
        this.modalview=event
    }
    
    ngOnDestroy(): void {
        this.blockeuserlistget$?.unsubscribe()
    }
   
}