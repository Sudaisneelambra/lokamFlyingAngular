import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PlaceService } from "src/app/modules/agency/services/place.service";

@Component({
    selector:'app-strictdelete',
    templateUrl:'./strictdelete.component.html',
    styleUrls:['strictdelete.component.css']
})

export class StrictDelete {
    
    constructor(private placeservice:PlaceService){}
    @Input() id:any
    @Output() cancel=new EventEmitter()

    cancelation(){
        this.cancel.emit(false)
    }

    delete(){
        this.placeservice.packageplacedelete(this.id).subscribe({
            
        })

    }
}