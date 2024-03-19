import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { agencyService } from '../../services/agency.service';
import { Subscription } from 'rxjs';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css'],
})
export class PlaceAddComponent implements OnInit, OnDestroy {
  placeForm: FormGroup;
  maxImagesAllowed: number = 5;
  message!: string;
  selectedImages: File[] = [];
  placedata!: any;
  id: any;
  expiry: any;
  singleplace$ = new Subscription();
  placeadd$ = new Subscription();
  placeedit$ = new Subscription();



  // constructor for injecting srvices and creating place form
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private service: agencyService,
    private placeservice: PlaceService,
    private route: ActivatedRoute
  ) {
    // Initialize the form
    this.placeForm = this.formBuilder.group({
      placeName: ['', Validators.required],
      placeDescription: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      entryFee: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  // ng oninit token verification
  ngOnInit(): void {
    // getting queryparams
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        // deleting place from database
        this.singleplace$ = this.placeservice.getsingleplace(this.id).subscribe({
          next: (res) => {
            if (res.expiry) {
              this.expiry = res.expiry;
              alert('session expired please login')
              this.service.agencylogout()
            } else{
              this.placedata = res.data;
              this.placeForm
                .get('placeName')
                ?.patchValue(this.placedata.placeName);
              this.placeForm
                .get('placeDescription')
                ?.patchValue(this.placedata.placeDescription);
              this.placeForm
                .get('openingTime')
                ?.patchValue(this.placedata.openingTime);
              this.placeForm
                .get('closingTime')
                ?.patchValue(this.placedata.closingTime);
              this.placeForm.get('entryFee')?.patchValue(this.placedata.entryFee);
              this.placeForm.get('location')?.patchValue(this.placedata.location);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  //  place form submitting
  onSubmit() {
    if (this.selectedImages.length < 5) {
      this.message = 'please select minimum and maximum 5photos';
    } else if (this.placeForm.valid) {
      const formData = new FormData();
      formData.append('placeName', this.placeForm.value.placeName);
      formData.append(
        'placeDescription',
        this.placeForm.value.placeDescription
      );
      formData.append('openingTime', this.placeForm.value.openingTime);
      formData.append('closingTime', this.placeForm.value.closingTime);
      formData.append('entryFee', this.placeForm.value.entryFee);
      formData.append('location', this.placeForm.value.location);

      // Append selected images

      for (const image of this.selectedImages) {
        formData.append('images', image);
      }

      // add place api
      this.placeadd$ = this.placeservice.addplace(formData).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else{
            if (res.success) {
              this.message = res.message;
              setTimeout(() => {
                this.message = '';
                this.router.navigate(['agency/home']);
              }, 2000);
            } else {
              this.message = res.message;
            }
          }
          
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
    }
  }

  // edit button triggered for edit place
  edit() {
    if (this.selectedImages.length < 5) {
      this.message = 'please select minimum and maximum 5photos';
    } else if (this.placeForm.valid) {
      const formData = new FormData();
      formData.append('placeName', this.placeForm.value.placeName);
      formData.append(
        'placeDescription',
        this.placeForm.value.placeDescription
      );
      formData.append('openingTime', this.placeForm.value.openingTime);
      formData.append('closingTime', this.placeForm.value.closingTime);
      formData.append('entryFee', this.placeForm.value.entryFee);
      formData.append('location', this.placeForm.value.location);
      formData.append('id', this.id);

      // Append selected images

      for (const image of this.selectedImages) {
        formData.append('images', image);
      }

      // edit place api
      this.placeedit$= this.placeservice.editplace(formData).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else{
            if (res.success) {
              this.message = res.message;
              setTimeout(() => {
                this.message = '';
                this.router.navigate(['agency/home']);
              }, 2000);
            } else {
              this.message = res.message;
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
    }
  }

  // images file changing dettection
  onImageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const maxImages = Math.min(5, event.target.files.length);
      if (this.selectedImages.length < this.maxImagesAllowed) {
        for (let i = 0; i < maxImages; i++) {
          this.selectedImages.push(event.target.files[i]);
        }
      } else {
        alert(`You can only select up to ${this.maxImagesAllowed} images.`);
      }
    }
  }

  // back to previous location
  back() {
    this.location.back();
  }

  // ondistroy
  ngOnDestroy(): void {
    this.singleplace$?.unsubscribe();
    this.placeadd$?.unsubscribe()
    this.placeedit$?.unsubscribe()
  }
}
