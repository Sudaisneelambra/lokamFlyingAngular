import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { io } from "socket.io-client";
import { ChatService } from "src/app/services/chatservice.service";
@Component({
    selector:'app-messaging',
    templateUrl:'./messaging.component.html',
    styleUrls:['./messaging.component.css']
})

export class MessagingComponent{

    data:any
    newMessage:any
    username:any
    $userprifile=new Subscription()
    profile$ = new Subscription;
    messages: any[] = [];
    private socket: any;
  singleusrchat$ =new Subscription()
  name: any;


    constructor(private chatservice:ChatService, private router:Router, private route:ActivatedRoute){}

    ngOnInit(): void {
      


          this.route.params.subscribe((params)=>{
            this.name=params['name']
            console.log(this.name);
           if(this.name){
            this.singleusrchat$ =this.chatservice.getsingleusrchat(this.name).subscribe({
              next:(res)=>{
                this.messages=res
                console.log(this.messages);
              },
              error:(err)=>{
                console.log(err);
                
              }
            })
           }
            
          })

        // Connect to socket.io server
        this.socket = io('http://localhost:1000'); // Replace with your server URL
        this.socket.on('message', (message:any) =>{
          this.singleusrchat$ =this.chatservice.getsingleusrchat(this.name).subscribe({
            next:(res)=>{
              this.messages=res
              console.log(this.messages);
            },
            error:(err)=>{
              console.log(err);
              
            }
          })
        });

         
    }

    sendMessage() {
      if(this.newMessage !== ''){
        this.chatservice.sendMessage(this.newMessage,'sudais',this.name);
        this.newMessage = '';
      }

      this.chatservice.getsingleusrchat(this.name).subscribe( {
        next:(res)=>{
          this.messages = res;
          console.log(this.messages);
        },
        error:(err)=>{
          console.log(err);
          
        }
          
        });
      }

      ngOnDestroy(): void {
        this.$userprifile?.unsubscribe()
    }
}