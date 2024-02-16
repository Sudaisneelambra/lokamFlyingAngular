
import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit{
  @Input() data:any;

  isHovered:boolean=false
  interwell:number=0
  truncatedDescription:any
  placeName:any
    ngOnInit(): void {
     setInterval(()=>{
      this.interwell=Math.floor(5*Math.random())
     },3000) 
     console.log(this.data);

     

      this.truncatedDescription = this.truncateDescription(this.data.placeDescription)
      this.placeName=this.place(this.data.placeName)
       
    }

   

    onMouseEnter() {
      this.truncatedDescription = this.fullviewDescription(this.data.placeDescription); // Store the original description
      this.placeName= this.fullPlacename(this.data.placeName)
    }
  
    onMouseLeave() {
      this.truncatedDescription = this.truncateDescription(this.data.placeDescription); // Apply the pipe again
      this.placeName= this.place(this.data.placeName)
    }
  
    private truncateDescription(value: string): string {
      return value.length > 50 ? `${value.substring(0, 50)}...` : value;
    }

    private fullviewDescription(value: string): string {
      return value
    }

    private place(value: string): string {
      return value.length > 13 ? `${value.substring(0, 13)}...` : value;
    }

    private fullPlacename(value: string): string {
      return value;
    }


    
}
