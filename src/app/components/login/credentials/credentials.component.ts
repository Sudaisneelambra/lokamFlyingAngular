import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/commonSignup.service";

@Component({
    selector:'app-credentials',
    templateUrl:'./credentials.component.html',
    styleUrls:['./credentials.component.css']
})

export class CredentialsComponent implements OnInit,OnDestroy{
    
    
    @Output() cans =new EventEmitter()
    data: any;
    credential$ = new Subscription()
    loginwithcredential$= new Subscription();
    constructor(private commonservice:UserService,private router:Router){}
    
    ngOnInit(): void {
        this.credential$ = this.commonservice.getcredentials().subscribe({
            next:(res)=>{
                this.data=res
            },
            error:(err)=>{
               setTimeout(() => {
                this.router.navigate(['/authentication'])
               }, 4000);
            }
        })
    }

    usecredential(id:any){
        this.loginwithcredential$ = this.commonservice.loginwithcredential(id).subscribe({
            next:(res)=>{
                localStorage.setItem('token', res.token); // Store JWT token in localStorage upon successful login
                localStorage.setItem('type', res.type);
                  this.router.navigate(['user']);
            },
            error:(err)=>{
                this.router.navigate(['/authentication'])
            }
        })
    }

    cancel(){
        this.cans.emit(false)
    }

    ngOnDestroy(): void {
        this.credential$?.unsubscribe()
    }
}