import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChattingSerive } from "../../services/chatingservice.service";
import { Router } from "@angular/router";

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

    constructor(private chatservice:ChattingSerive, private router:Router){}

    ngOnInit(): void {
        this.userslist$ = this.chatservice.getMessages().subscribe( {
            next:(res)=>{
              this.messages = res
              console.log(this.messages);
              this.list= this.messages.filter((m)=>{
                console.log(m.sender);
                return m.sender != 'sudais'
              }).map((n)=>{
                return n.sender
              })
              console.log(this.list);
              this.uniquesender=[...new Set(this.list)]
              console.log(this.uniquesender);
              
              
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