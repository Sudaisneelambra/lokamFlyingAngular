import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { useservice } from "../../../services/user.service";

@Component({
    selector:'app-starrating',
    templateUrl:'./starrating.component.html',
    styleUrls:['./starrating.component.css']
})

export class StarRattingComponent implements OnInit,OnDestroy{
    stars: number[] = [1, 2, 3, 4, 5];
    filledStars: number = 0;

    @Output() rate = new EventEmitter()
  
    constructor(private service:useservice) {}

    ngOnInit(): void {
        this.service.starfilling.subscribe((val)=>{
            this.filledStars=val
        })
    }
   
  
    fillStar(index: number) {
      this.filledStars = index;
        this.rate.emit(this.filledStars)
    }

    ngOnDestroy(): void {
    }
}