import { Component, Input, OnInit } from '@angular/core';
import { agencyService } from '../../../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit {
  
  constructor(private service: agencyService, private router: Router) {}

  @Input() package!: any;

  ngOnInit(): void {
    console.log(this.package);
  }

  getpackage(id: any) {
    this.router.navigate([`/agency/packagedetails/${id}`]);
  }
}
