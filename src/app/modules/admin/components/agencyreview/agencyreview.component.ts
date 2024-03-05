import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { useservice } from "src/app/modules/user/services/user.service";
import { admincommon } from "../../services/admincommon.service";

@Component({
    selector:'app-agencyreview',
    templateUrl:'./agencyreview.component.html',
    styleUrls:['./agencyreview.component.css']
})

export class AgencyReviewComponent{

    review$ = new Subscription()
    reviewdata:any

    constructor(private service:useservice, private commonadmin:admincommon) {}


    ngOnInit(): void {
        this.review$ = this.commonadmin.getallagencyreview().subscribe({
            next:(res)=>{
                this.reviewdata=res.data   
                console.log(this.reviewdata);
            },
            error:(err)=>{
                console.log(err);
                
            }
        })
    }
    ngOnDestroy(): void {
        this.review$?.unsubscribe()
    }
}