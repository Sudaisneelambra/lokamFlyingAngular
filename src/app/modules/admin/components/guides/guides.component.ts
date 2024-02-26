import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { adminguide } from '../../services/adminguide.service';
import { admincommon } from '../../services/admincommon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.css'],
})
export class guidescomponent implements OnInit, OnDestroy {
  guides: any;
  guidegetting$ = new Subscription();

  constructor(private guideservice: adminguide, private service: admincommon, private router:Router) {}

  ngOnInit(): void {
    this.guidegetting$ = this.guideservice.gettingguides().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.agencylogout();
        } else {
          if (res.success) {
            this.guides = res.data;
            console.log(this.guides);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  singleguide(id:any){
    this.router.navigate(['/admin/guidedetails',id])
  }

  ngOnDestroy(): void {
    this.guidegetting$?.unsubscribe()
  }
}
