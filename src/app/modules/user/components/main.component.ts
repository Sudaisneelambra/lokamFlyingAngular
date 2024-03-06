import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { userprofileservice } from '../services/profile.service';
import { useservice } from '../services/user.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainHome implements OnInit, OnDestroy {

  $userprifile=new Subscription()
  name:any
  bool=false
  constructor(private router:Router, private profileservice:userprofileservice ,private service:useservice) {}

  ngOnInit(): void {

    if (this.router.url == '/user') {
      
      this.router.navigate(['/user/home']);
    }

    this.bool=true
   setTimeout(() => {
    this.$userprifile = this.profileservice.getusername().subscribe({
      next:(res)=>{
        if (res.expiry) {
          alert('session expired or internal server , please login');
          this.service.userlogout();
        } else {
          if (res.success) {
            this.bool= false
            this.name=res.data.username 
          } else{
            console.log(res.message);
          }
        }
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
   }, 3700);
  }

  ngOnDestroy(): void {
    this.$userprifile?.unsubscribe()
  }
}
