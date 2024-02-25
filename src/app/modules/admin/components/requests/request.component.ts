import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { requestagency } from '../../services/requistagency.service';
import { admincommon } from '../../services/admincommon.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit, OnDestroy {
  requistedAgency$ = new Subscription();
  data!: any;
  aproveId:any
  modalview=false


  constructor(private request: requestagency , private service:admincommon) {}

  ngOnInit(): void {
    this.requistedAgency$ = this.request.requestedagency().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login');
          this.service.agencylogout();
        } else {
          if (res.success) {
            this.data = res.data;
            console.log(this.data);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  approve(id:any){
    this.aproveId=id
    this.modalview=true
  }

  cancelling(event:any){
    this.modalview=event
  }
  ngOnDestroy(): void {
    this.requistedAgency$?.unsubscribe();
  }
}
