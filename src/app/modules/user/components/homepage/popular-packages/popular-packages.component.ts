import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'popular-packages',
  templateUrl: './popular-packages.component.html',
  styleUrls: ['./popular-packages.component.css']
})
export class PopularPackagesComponent {

  @Input() package:any

  constructor(private router:Router) {}

 
  singlepackage(id:any){
    this.router.navigate(['/user/singlepackage',id])

  }
}
