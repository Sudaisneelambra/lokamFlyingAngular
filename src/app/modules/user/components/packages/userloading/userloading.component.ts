import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-loading',
    templateUrl:'./userloading.component.html',
    styleUrls:['./userloading.component.css']
})

export class UserLoadingComponent implements OnInit,OnDestroy{

    constructor(private router:Router) {}

    ngOnInit(): void {
        setTimeout(() => {
            this.router.navigate(['/user/home'])
        }, 3000);
    }
    ngOnDestroy(): void {
    }

}