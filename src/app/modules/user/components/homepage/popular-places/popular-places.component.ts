import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'popular-places',
  templateUrl: './popular-places.component.html',
  styleUrls: ['./popular-places.component.css']
})
export class PopularPlacesComponent implements OnInit{
 
  @Input() place: any[] = []; // Assuming this array contains your place data
  
  index!:number

  constructor( private router:Router) {}

  ngOnInit(): void {
    setInterval(()=>{
      this.index= Math.floor(5*Math.random())
    },2000)
  }

  // Method to show all places when the "More" button is clicked
  showAllPlaces() {
    this.router.navigate(['/user/places'])
    
  }
}
