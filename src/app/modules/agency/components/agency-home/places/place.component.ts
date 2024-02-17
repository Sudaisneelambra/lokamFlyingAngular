
import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { agencyService } from '../../../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit{

  constructor(private service:agencyService, private rounter:Router){}

  @Input() data:any;
  isHovered:boolean=false
  interwell:number=0
  truncatedDescription:any
  placeName:any

  selectedIndex=0
  bool=true
  control=true
  val=true
  images:any
  
    ngOnInit(): void {
     this.images=this.data.placeurl
     

      this.truncatedDescription = this.truncateDescription(this.data.placeDescription)
      this.placeName=this.place(this.data.placeName)

      if(this.val){
        this.auto()
      }
       
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
      return value.length > 12 ? `${value.substring(0, 12)}...` : value;
    }

    private fullPlacename(value: string): string {
      return value;
    }

    fulldetails(id:any){
      this.rounter.navigate([`/agency/placedetails/${id}`])
    }

   
  
    selectimge(index:number){
      this.selectedIndex=index
    }
    onprevclick(){
      if(this.selectedIndex === 0){
        this.selectedIndex =this.images.length-1
      } else{
        this.selectedIndex --;
      }
    }
    onnextclick(){
      if(this.selectedIndex === this.images.length-1){
        this.selectedIndex =0
      } else{
        this.selectedIndex ++;
      }
    }
  
    auto(){
      setInterval(()=>{
        this.onnextclick()
      },6000)
    }
    
}
