import { Component } from "@angular/core";
import { useservice } from "../../services/user.service";

@Component({
    selector:'app-navbar',
    templateUrl:'./navbar.component.html',
    styleUrls:['./navbar.component.css']
})

export class NavBarComponent{

    bool= false

    constructor(private userservice:useservice){}

    toggle(){
        if(this.bool){
            this.bool=false
        } else{
            this.bool=true
        }
    }

    logout(){
        this.userservice.agencylogout()
    }
}