import { Component, Input } from '@angular/core';

@Component({
  selector: 'popular-packages',
  templateUrl: './popular-packages.component.html',
  styleUrls: ['./popular-packages.component.css']
})
export class PopularPackagesComponent {

  @Input() package:any


  showAllPlaces(){
    
  }
}
