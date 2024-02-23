import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-adminhome',
    templateUrl:'./adminhome.component.html',
    styleUrls:['./adminhome.component.css']
})

export class AdminHome {

    one=true

    constructor(private router:Router){}

  boolean(){
    if(this.one){
      this.one=false
    } else {
      this.one=true
    }
  }

  gotouser(){
    this.router.navigate(['/admin/user-list'])
  }

  gotoagency(){
    this.router.navigate(['/admin/agency-list'])
  }
}