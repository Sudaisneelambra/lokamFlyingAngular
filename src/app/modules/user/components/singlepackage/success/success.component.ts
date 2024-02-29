import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-success',
    templateUrl:'./success.component.html',
    styleUrls:['./success.component.css']
})

export class SuccessComponent{
    
    @Output() bool = new EventEmitter()

    okey(){
        this.bool.emit(false)
    }
}