import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { useservice } from 'src/app/modules/user/services/user.service';
import { UserService } from 'src/app/services/commonSignup.service';
import { agencyService } from '../../services/agency.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agency-home',
  templateUrl: './agency-home.component.html',
  styleUrls: ['./agency-home.component.css'],
})
export class AgencyHomeComponent implements OnInit , OnDestroy{

  placeSubscription$ = new Subscription;
  guideSubscription$ =new Subscription;
  name!:string
  data:any
  guide:any
  booleanvalue:boolean=true

  constructor(private service: agencyService, private router: Router) {}
  
  ngOnInit(){

    // all place getting api
    this.placeSubscription$= this.service.gettingplace().subscribe({
      next:(res)=>{
        this.data= res.data
      },
      error:(err)=>{
        console.log(err);
        console.log(err.message);
      }
    })

    //all place getting api
    this.guideSubscription$ =this.service.gettingguides().subscribe({
      next:(res)=>{
        this.guide= res.data
      },
      error:(err)=>{
        console.log(err);
        console.log(err.message);
      }
    })

  }

  // logout
  logout() {

  // logout and token delete
    this.service.agencylogout().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log('logouted');
    this.router.navigate(['authentication']);
  }


// page distroying
  ngOnDestroy(): void {

    this.placeSubscription$.unsubscribe()

    this.guideSubscription$.unsubscribe()
  }
}
