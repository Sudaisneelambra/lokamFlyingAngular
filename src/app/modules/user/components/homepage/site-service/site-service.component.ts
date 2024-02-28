import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'site-service',
  templateUrl: './site-service.component.html',
  styleUrls: ['./site-service.component.css']
})
export class SiteServiceComponent {

  constructor(private router:Router){}

  bookingpage(){
    this.router.navigate(['/user/bookng-trip'])
  }

}
