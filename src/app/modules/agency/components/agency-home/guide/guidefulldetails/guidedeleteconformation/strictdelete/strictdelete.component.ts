import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { PlaceService } from "src/app/modules/agency/services/place.service";

@Component({
    selector:'app-strictdelete',
    templateUrl:'./strictdelete.component.html',
    styleUrls:['strictdelete.component.css']
})

export class StrictDelete {
    
    constructor(private placeservice:PlaceService ,private router:Router){}
    @Input() id:any
    @Output() cancel=new EventEmitter()

    cancelation(){
        this.cancel.emit(false)
    }

    delete(){
        this.placeservice.packageplacedelete(this.id).subscribe({
            next: (res) => {
                if (res.success) {
                    console.log('strictly confirmed and deleted');
                    
                  setTimeout(() => {
                    this.router.navigate(['/agency/home']);
                  }, 1000);
                }
              },
              error: (err) => {
                console.log(err);
              },
        })

    }
}