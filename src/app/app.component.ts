import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/commonSignup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private commonSignupService:UserService){}

  ngOnInit(): void {
    this.commonSignupService.type=  this.commonSignupService.tockendecode();
    
  }
  title = 'lokamaflying';


}
