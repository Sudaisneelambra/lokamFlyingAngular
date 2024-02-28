import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'trending-agency',
  templateUrl: './trending-agency.component.html',
  styleUrls: ['./trending-agency.component.css']
})
export class TrendingAgencyComponent implements OnInit, OnChanges{

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.agency);
    
  }
 
  @Input() agency:any

  ngOnInit(): void {
    console.log(this.agency);
    
  }

}
