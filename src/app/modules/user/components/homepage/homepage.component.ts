import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';
import { useservice } from '../../services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent {
  constructor(private service: useservice, private router: Router) {}

  logout() {
    const one = localStorage.getItem('tokenuser');
    console.log(one);
    this.service.userlogout().subscribe({
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
