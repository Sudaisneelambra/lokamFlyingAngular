import { AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-package',
    templateUrl:'./package.component.html',
    styleUrls:['./package.component.css']
})
export class PackageComponet {
  

    @Input() package:any

    constructor(private router:Router) {}

    singlepackage(id:any){
        this.router.navigate(['/user/singlepackage',id])
    }

    isExpired(date:any){
        if(new Date(date)<new Date()){
          return true    
        }else{
          return false
        }
      }

}