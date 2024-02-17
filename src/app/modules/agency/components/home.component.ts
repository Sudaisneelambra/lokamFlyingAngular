import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { agencyService } from "../services/agency.service";
import { Router } from "@angular/router";


@Component({
    selector:'app-homeagency',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.css']
})

export class AgencyMainHome{
    profileSubscription$!: Subscription;
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

      this.router.navigate(['/agency/home'])
  
  
    }

    bool: boolean = false;
  
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
    showSide:Boolean=false;

    showSideBar(){
      this.showSide=!this.showSide;
      console.log('btn clicked');
    }
  
    ngOnDestroy(): void {
      this.profileSubscription$.unsubscribe()
    }
}