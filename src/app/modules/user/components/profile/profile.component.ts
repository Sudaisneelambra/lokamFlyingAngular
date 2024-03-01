import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userprofileservice } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { useservice } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  userprof$ = new Subscription();
  data: any;

  constructor(
    private router: Router,
    private userprofile: userprofileservice,
    private location: Location,
    private service:useservice
  ) {}

  ngOnInit(): void {
    this.userprof$ = this.userprofile.getprofile().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.userlogout();
        } else {
          if (res.success) {
            this.data = res.data;
            console.log(this.data);
          }
        }
      },
      error: (err) => {
        console.log(err);
        console.log(err.error.message );
      },
    });
  }

  back() {
    this.router.navigate(['/user/home'])
  }

  add() {
    this.router.navigate(['/user/profileadd']);
  }

  edit(id: any) {
    this.router.navigate(['/user/profileadd'], { queryParams: { id } });
  }

  ngOnDestroy(): void {
    this.userprof$?.unsubscribe();
  }
}
