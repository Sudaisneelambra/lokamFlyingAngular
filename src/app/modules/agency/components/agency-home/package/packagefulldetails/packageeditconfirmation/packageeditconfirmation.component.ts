import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'app-packageedit',
    templateUrl:'./packageeditconfirmation.component.html',
    styleUrls:['./packageeditconfirmation.component.css']
})

export class PackageEditConfirmationComponent implements OnInit{



    @Input() id!:any
    @Output() editcancel= new EventEmitter()

    constructor(private router:Router){}
    ngOnInit(): void {
        console.log(this.id);
        
    }

    confirmboolean(){
         this.router.navigate([`/agency/packageadd`], { queryParams: { id: this.id } })
    }

    cancel(){
        this.editcancel.emit(false)
    }
}