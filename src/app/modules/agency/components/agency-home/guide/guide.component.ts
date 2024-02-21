import { Component, Input, OnInit } from '@angular/core';
import { agencyService } from '../../../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
})
export class GuideComponent implements OnInit {

  @Input() guide: any;
  aboutguide: any;
  fullguide!: any;

  constructor(private service: agencyService, private router: Router) {}
  
// discription piping
  ngOnInit(): void {
    // discription piping
    this.aboutguide = this.slittedDiscription(this.guide.aboutguide);
  }

  //getting all details button
  getguide(id: any) {
    //navigate to guide details with params
    this.router.navigate([`/agency/guidedetails/${id}`]);
  }

  // piping function
  onMouseEnter() {
    this.aboutguide = this.fulldetails(this.guide.aboutguide);
  }

  // piping function
  onMouseLeave() {
    this.aboutguide = this.slittedDiscription(this.guide.aboutguide);
  }

  // piping function
  private slittedDiscription(value: string) {
    return value.length > 55 ? `${value.substring(0, 55)}...` : value;
  }

  // piping function
  private fulldetails(value: string) {
    return value;
  }
}
