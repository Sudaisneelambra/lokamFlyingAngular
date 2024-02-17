import { Component } from "@angular/core";
import { agencyService } from "src/app/modules/agency/services/agency.service";

@Component({
    selector:'app-guidfulldetails',
    templateUrl:'./guidefulldetails.component.html',
    styleUrls:['./guidefulldetails.component.css']
})

export class GuideFulldetailes{

    constructor(private service:agencyService){}

    onInit(){
        
    }
}