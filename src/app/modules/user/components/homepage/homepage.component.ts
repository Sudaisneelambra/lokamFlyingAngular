import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private service:UserService,private router:Router){}


  logout(){
    this.service.logout()
    console.log('logouted');
    this.router.navigate(['authentication'])
    
  }
}
