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
               if(res.expiry){
                alert('session expired')
                this.router.navigate(['/authentification'])
               } else {
                this.messages=res
                console.log(this.messages);
               }
              },
              error:(err)=>{
                console.log(err);
                
              }
            })
           }
            
          })

        // Connect to socket.io server
        this.socket = io('http://localhost:1000',{
                      auth: {
                        username: `sudais`,
                      },
                    });

        this.socket.on('message', (message:any) =>{
          console.log("message from socket",message)
          this.messages.push(message)
        })

         
    }

    sendMessage() {
      if(this.newMessage !== ''){
        const datas={chatdata:this.newMessage,reciver:this.name,sender:'sudais',date:new Date()}
        this.messages.push(datas)
        this.socket.emit('message', datas);
        this.newMessage = '';
      }
      }

      ngOnDestroy(): void {
        this.$userprifile?.unsubscribe()
    }
}