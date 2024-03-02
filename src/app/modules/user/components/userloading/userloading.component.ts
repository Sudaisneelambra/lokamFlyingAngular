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
    }
    ngOnDestroy(): void {
    }

}