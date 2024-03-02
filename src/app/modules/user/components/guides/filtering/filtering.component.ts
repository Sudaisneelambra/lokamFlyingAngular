import { Component, DoCheck, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-filteringguide',
    templateUrl:'./filtering.component.html',
    styleUrls:['./filtering.component.css']
})

export class FilteringguideComponent implements DoCheck{
  
    selectedPriceRange:any
    bool=true
    @Output() filteredvalue= new EventEmitter()

    @Input() agency:any
    one:any
    uniqueAgencyNames:any

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

    ngDoCheck(): void {
        this.one= this.agency?.map((m:any) => {
           return m.agencydetails[0].name
        });
        this.uniqueAgencyNames = [...new Set(this.one)];
        
    }
 
}