import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-agencylist',
    templateUrl:'./agencylist.component.html',
    styleUrls:['./agencylist.component.css']
})

export class PackageListComponent{

    @Input() agency:any

    constructor(private router:Router) {}

    singlepackage(id:any){
        // this.router.navigate(['/user/singlepackage',id])
    }
}