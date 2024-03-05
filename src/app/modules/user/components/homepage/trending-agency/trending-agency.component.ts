import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'trending-agency',
  templateUrl: './trending-agency.component.html',
  styleUrls: ['./trending-agency.component.css']
})
export class TrendingAgencyComponent implements OnInit, OnChanges{


  constructor(private router:Router) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.agency);
  }


 
  @Input() agency:any

  ngOnInit(): void {
    console.log(this.agency);
    
  }

  gotopackage(id:any){
    this.router.navigate(['/user/agencyfulldetails',id])
  }

}
