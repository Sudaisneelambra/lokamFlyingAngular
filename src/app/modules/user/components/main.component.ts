import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-mainhome',
    templateUrl:'./main.component.html',
    styleUrls:['./main.component.css']
})

export class MainHome implements OnInit{


    constructor(private router:Router) {}

    ngOnInit(): void {

        if(this.router.url =='/user'){
            this.router.navigate(['/user/home'])
        }
        
    }

}