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

  profileSubscription$!: Subscription;
  placeSubscription$!: Subscription;
  guideSubscription$!: Subscription;
  name!:string
  data:any
  guide:any
  booleanvalue:boolean=true

  constructor(private service: agencyService, private router: Router) {}
  
  ngOnInit(){
    this.profileSubscription$ = this.service.getingprofile().subscribe({
      next:(res)=>{
        this.name=res.user.name
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.placeSubscription$= this.service.gettingplace().subscribe({
      next:(res)=>{
        console.log(res);
        this.data= res.data
        console.log(res.message);
      },
      error:(err)=>{
        console.log(err);
        console.log(err.message);
      }
    })

    this.guideSubscription$ =this.service.gettingguides().subscribe({
      next:(res)=>{
        console.log(res);
        this.guide= res.data
        console.log(res.message);
      },
      error:(err)=>{
        console.log(err);
        console.log(err.message);
      }
    })

  }
  bool: boolean = true;

  toggle() {
    if (this.bool) {
      this.bool = false;
    } else {
      this.bool = true;
    }
  }
  
  logout() {
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



  ngOnDestroy(): void {
    this.profileSubscription$.unsubscribe()

    this.placeSubscription$.unsubscribe()

    this.guideSubscription$.unsubscribe()
  }
}
