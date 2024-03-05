import { Component, DoCheck } from '@angular/core';
import { Subscription } from 'rxjs';
import { agencyService } from '../services/agency.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-homeagency',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AgencyMainHome implements DoCheck{
  profileSubscription$ = new Subscription();
  name!: string;
  data: any;
  guide: any;
  booleanvalue: boolean = true;
  profileckecks: any;

  constructor(
    private service: agencyService,
    private router: Router,
    private profileservice: ProfileService
  ) {}

  bool: boolean = true;
  // oninit
  ngOnInit() {

   
 
    this.service.findprofilecollection().subscribe({
      next:(res)=>{
        console.log(res.profileadd);
        
        this.profileckecks=res.profileadd
        
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
    // getting profile name
    this.profileSubscription$ = this.profileservice
      .getingprofilename()
      .subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else{
            this.name = res?.user?.name;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
   
  }

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
    this.service.agencylogout()
  }

  // destroying component
  ngOnDestroy(): void {
    this.profileSubscription$?.unsubscribe();
  }

  ngDoCheck() {
    if(this.router.url !== '/agency/home' && this.router.url !== '/agency/profileadd'){
      if(!this.profileckecks){
        console.log(this.profileckecks);  
      
        this.router.navigate(['/agency/profileadd'])
      }
    }
  }
}
