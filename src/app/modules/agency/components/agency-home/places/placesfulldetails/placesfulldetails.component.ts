import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Carousel, initTE } from 'tw-elements';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from 'src/app/modules/agency/services/place.service';

@Component({
  selector: 'app-placefulldetails',
  templateUrl: './placesfulldetails.component.html',
  styleUrls: ['./placesfulldetails.component.css'],
})
export class PlaceFulldetails implements OnInit, OnDestroy {

  
  singlePlacedata!: any;
  selectedIndex = 0;
  bool = true;
  control = true;
  val = true;
  images: any;
  msg!: string;
  modaldelete!: boolean;
  modalEdit!: boolean;
  deleteId!: any;
  editId!: any;
  
  // constructor for injecting services
  constructor(
    private service: agencyService,
    private placeservice: PlaceService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  // oninit for getting single place
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // getting all detials of specific place
      this.placeservice.getsingleplace(id).subscribe({
        next: (res) => {
          this.singlePlacedata = res.data;
          this.images = res.data.placeurl;
        },
        error: (err) => {
          this.router.navigate(['/error']);
        },
      });
    });
    // auto carosel
    if (this.val) {
      this.auto();
    }
  }

  // delete   cancel modal output emmitter
  deleteconfirmvalue(event: any) {
    this.modaldelete = event;
  }

  // delete button
  delete(id: any) {
    this.modaldelete = true;
    this.deleteId = id;
  }

  // cancel edit  output emmitter
  cancellingedit(event: any) {
    this.modalEdit = event;
  }

  // edit button triggered
  edit(id: any) {
    this.modalEdit = true;
    this.editId = id;
  }

  // message output emmitter
  message(event: any) {
    this.msg = event;
  }

  // carosel function
  selectimge(index: number) {
    this.selectedIndex = index;
  }

  // carosel preview button function
  onprevclick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images?.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  // carosel next button function
  onnextclick() {
    if (this.selectedIndex === this.images?.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  // auto acrosel
  auto() {
    setInterval(() => {
      this.onnextclick();
    }, 5000);
  }

  // back to previous location
  back() {
    this.location.back();
  }

  // distroing component
  ngOnDestroy(): void {}
}
