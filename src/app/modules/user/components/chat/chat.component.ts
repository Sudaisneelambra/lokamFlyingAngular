import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChatService } from "../../../../services/chatservice.service";
import { Subscription } from "rxjs";
import { ProfileService } from "src/app/modules/agency/services/profile.service";
import { userprofileservice } from "../../services/profile.service";
import { useservice } from "../../services/user.service";
import { Router } from "@angular/router";
import { io } from "socket.io-client";

@Component({
    selector:'app-chating',
    templateUrl:'./chat.component.html',
    styleUrls:['./chat.component.css']
})

export class ChatComponent implements OnInit,OnDestroy{

    newMessage:any
    username:any
    $userprifile=new Subscription()
    profile$ = new Subscription;
    messages: any[] = [];
    chatlist$=new Subscription()
    private socket: any;


    constructor(private chatservice:ChatService, private profileservice:userprofileservice, private service:useservice, private router:Router){}

    ngOnInit(): void {

        this.profile$ = this.profileservice.getprofile().subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired please login');
                this.service.userlogout();
              }
            },
            error: (err) => {
              this.router.navigate(['/user/profileadd']);
            },
          });



        this.$userprifile = this.profileservice.getusername().subscribe({
            next:(res)=>{
              if (res.expiry) {
                alert('session expired or internal server , please login');
                this.service.userlogout();
              } else {
                if (res.success) {
                  this.username=res.data.username 
                } else{
                  console.log(res.message);
                }
              }
              
            },
            error:(err)=>{
              console.log(err);
            }
          })

          this.chatlist$ = this.chatservice.getMessages().subscribe( {
          next:(res)=>{
            this.messages = res;
            console.log(this.messages);
          },
          error:(err)=>{
            console.log(err);
            
          }
            
          });
      
          // Connect to socket.io server
          this.socket = io('http://localhost:1000');
          this.socket.on('message', (message:any) =>{
            console.log(message);
            this.messages.push(message)
          });
    }

    sendMessage() {
      if(this.newMessage !== ''){
        this.chatservice.sendMessage(this.newMessage,this.username,'sudais');
        this.newMessage = '';
      }

      }

      ngOnDestroy(): void {
        this.$userprifile?.unsubscribe()
        this.profile$?.unsubscribe()
        this.chatlist$?.unsubscribe()

    }
}