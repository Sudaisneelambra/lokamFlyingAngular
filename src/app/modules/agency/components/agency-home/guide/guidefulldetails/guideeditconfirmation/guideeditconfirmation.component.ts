import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-editconfirmation',
    templateUrl:'./guideeditconfirmation.component.html',
    styleUrls:['./guideeditconfirmation.component.css']
})

export class GuideEditConfirmationComponent implements OnInit{



    @Input() id!:any
    @Output() editcancel= new EventEmitter()

    constructor(private router:Router){}
    ngOnInit(): void {
        console.log(this.id);
        
    }

    confirmboolean(){
         this.router.navigate([`/agency/guideadd`], { queryParams: { id: this.id } })
    }

    cancel(){
        this.editcancel.emit(false)
    }
}