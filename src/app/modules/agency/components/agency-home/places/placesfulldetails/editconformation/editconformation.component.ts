import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'edit-conformation',
    templateUrl:'./editconformation.component.html',
    styleUrls:['./editconformation.component.css']
})

export class EditConformation implements OnInit{
    
    @Output() cancelvalue= new EventEmitter()
    @Input() id!:any
    

    constructor(private router:Router){}

    ngOnInit(): void {
        console.log(this.id);
    }

    cancel(){
        this.cancelvalue.emit(false)
    }
    confirmboolean(){
    this.router.navigate([`/agency/placeadd`], { queryParams: { id: this.id } })
    }
}