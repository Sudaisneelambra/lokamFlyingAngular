import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-filtering',
    templateUrl:'./filtering.component.html',
    styleUrls:['./filtering.component.css']
})

export class FilteringComponent{
    selectedPriceRange:any
    bool=true
    @Output() filteredvalue= new EventEmitter()

    boolean(){
        if(this.bool==true || this.bool == undefined ){
            this.bool=false
        } else{
            this.bool=true
        }
    }

    applyfilter(){
       this.filteredvalue.emit(this.selectedPriceRange)  
       this.bool=true
    }
}