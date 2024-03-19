import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChattingSerive } from "../../services/chatingservice.service";
import { Router } from "@angular/router";
import { useservice } from "src/app/modules/user/services/user.service";

@Component({
    selector:'app-chatting',
    templateUrl:'./chat.component.html',
    styleUrls:['./chat.component.css']
})

export class ChatList implements OnInit, OnDestroy{

    userslist$=new Subscription()
    messages!: any[];
    list: any;
    uniquesender:any

    constructor(private chatservice:ChattingSerive, private router:Router ,private service:useservice){}

    ngOnInit(): void {
        this.userslist$ = this.chatservice.getMessages().subscribe( {
            next:(res)=>{
              if (res.expiry) {
                alert('session expired or internal error please login');
                this.service.userlogout();
              } else {
                this.messages = res
                this.list= this.messages?.filter((m)=>{
                  return m.sender != 'sudais'
                }).map((n)=>{
                  return n.sender
                })
                this.uniquesender=[...new Set(this.list)]
                
              }
              
            },
            error:(err)=>{
              console.log(err);
            }  
            });
    }

    gotomessages(dt:any){
      this.router.navigate(['/admin/messages',dt])
    }
    ngOnDestroy(): void {
    }

}