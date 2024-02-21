import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { agencyService } from 'src/app/modules/agency/services/agency.service';
import { packageService } from 'src/app/modules/agency/services/package.service';

@Component({
  selector: 'app-fullpackage',
  templateUrl: './packagefulldetails.component.html',
  styleUrls: ['./packagefulldetails.component.css'],
})
export class PackagefullComponent implements OnInit, OnDestroy {

  singlepackagedetails$!: Subscription;
  singlepackage!: any;
  places: any;
  fulldetails: any;
  objplace: any;
  guide: any;
  result: any[] = [];
  expiry: any;

  modelEdit: any;
  modalview: any;
  deletedid: any;
  editId: any;
  message: any;

//   constructor for injecting services
  constructor(
    private rout: ActivatedRoute,
    private packageservice: packageService,
    private router: Router,
    private location: Location
) {}

//on init for geting all data of package 
  ngOnInit(): void {
    this.rout.params.subscribe((params) => {
      const id = params['id'];
      this.singlepackagedetails$ = this.packageservice.getsinglepackage(id).subscribe({
        next: (res) => {
          if (res.expiry) {
            this.expiry = res.expiry;
          }
          this.singlepackage = res.package;
          
          this.places = res.place;
          this.objplace = this.singlepackage.places;
          this.guide = res.guide;
          
          for(let i=0; i< this.places.length; i++){
            for(let j=0; j<this.places.length;j++){
              if(this.places[i]._id === this.objplace[j].placeid){
                let joinedObject = { ...this.places[i], ...this.objplace[j] };
                this.result.push(joinedObject);
              }
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

//   get guid api
  guideget(id: any) {
    console.log(id);
    this.router.navigate([`/agency/guidedetails/${id}`]);
  }

//   delete button
  delete(id: any) {
    this.modalview = true;
    this.deletedid = id;
  }

//   edit botton
  edit(id: any) {
    this.modelEdit = true;
    this.editId = id;
  }

//   back to previous page
  back() {
    this.location.back();
  }

//   cancel delete emit value from child
  canceldelete(event: any) {
    this.modalview = event;
  }

//   success message emit
  success(event: any) {
    this.message = event;
  }

//   edit cancel boolean value emitted from child
  calceledit(event: any) {
    this.modelEdit = event;
  }

//   page distroy
  ngOnDestroy(): void {
    this.singlepackagedetails$.unsubscribe();
  }
}
