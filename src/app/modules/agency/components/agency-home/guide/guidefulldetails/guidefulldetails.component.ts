import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { GuideService } from 'src/app/modules/agency/services/guid.service';

@Component({
  selector: 'app-guidfulldetails',
  templateUrl: './guidefulldetails.component.html',
  styleUrls: ['./guidefulldetails.component.css'],
})
export class GuideFulldetailes implements OnInit, OnDestroy {

    
    singleguidedetails$ = new Subscription();
    singleguide!: any;
    msg!: string;
    modalview!: any;
    modalviewedit!: any;
    deleteId!: any;
    editId!: any;
    
    // injecting services
    constructor(
      private guideservice: GuideService,
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private agencyservice:agencyService
    ) {}

// getting full details
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.singleguidedetails$ = this.guideservice.getsingleguide(id).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login');
            this.agencyservice.agencylogout();
          } else {
            this.singleguide = res.data;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  // deleteing guide
  delete(id: any) {
    this.modalview = true;
    this.deleteId = id;
  }

// delete  cancel boolean value emit from child
  cancelling(event: any) {
    this.modalview = event;
  }

//   message of delete success
  message(event: any) {
    this.msg = event;
  }

  // edit button triggered
  edit(id: any) {
    this.modalviewedit = true;
    this.editId = id;
  }

//   modal view cancelation boolean value emit from child
  modalclose(event: any) {
    this.modalviewedit = event;
  }

  // back to previous location
  back() {
    this.location.back();
  }

//   page distroy
  ngOnDestroy(): void {
    this.singleguidedetails$?.unsubscribe();
  }
}
