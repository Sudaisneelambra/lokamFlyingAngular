import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { useservice } from 'src/app/modules/user/services/user.service';
import { UserService } from 'src/app/services/commonSignup.service';
import { agencyService } from '../../services/agency.service';

@Component({
  selector: 'app-agency-home',
  templateUrl: './agency-home.component.html',
  styleUrls: ['./agency-home.component.css'],
})
export class AgencyHomeComponent {
  constructor(private service: agencyService, private router: Router) {}
  bool: boolean = true;

  toggle() {
    if (this.bool) {
      this.bool = false;
    } else {
      this.bool = true;
    }
  }

  logout() {
    this.service.agencylogout().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.log('logouted');
    this.router.navigate(['authentication']);
  }
}
