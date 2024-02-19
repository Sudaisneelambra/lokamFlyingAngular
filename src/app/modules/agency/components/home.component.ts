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
    profileSubscription$ = new Subscription;
    name!:string
    data:any
    guide:any
    booleanvalue:boolean=true
  
    constructor(private service: agencyService, private router: Router) {}
    
    ngOnInit(){
      // getting profile name 
      this.profileSubscription$ = this.service.getingprofilename().subscribe({
        next:(res)=>{
          this.name=res.user.name
          
        },
        error:(err)=>{
          console.log(err);
        }
      })

      // url check
      if(this.router.url === '/agency'){
        this.router.navigate(['/agency/home'])

      }

  
  
    }

    bool: boolean = false;
  
    // nav bar reponsive
    toggle() {
      if (this.bool) {
        this.bool = false;
      } else {
        this.bool = true;
      }
    }
    
    // logout
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
  
    // destroying component
    ngOnDestroy(): void {
      this.profileSubscription$.unsubscribe()
    }
}