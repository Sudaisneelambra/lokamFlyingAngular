import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:'app-starrating',
    templateUrl:'./starrating.component.html',
    styleUrls:['./starrating.component.css']
})

export class StarRattingComponent{
    stars: number[] = [1, 2, 3, 4, 5];
    filledStars: number = 0;

    @Output() rate = new EventEmitter()
  
    constructor() {}
  
    fillStar(index: number) {
      this.filledStars = index;
        this.rate.emit(this.filledStars)
    }
}