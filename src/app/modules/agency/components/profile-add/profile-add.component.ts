import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agencyService } from '../../services/agency.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';
import { useservice } from 'src/app/modules/user/services/user.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css'],
})
export class ProfileAddComponent implements OnInit, OnDestroy {

  message!: string;
  agencyForm: FormGroup;
  formdata = new FormData();
  photosArray: File[] = [];
  datas!:any
  profileSubscription$ = new Subscription;
  expiry: any;

  // constructor for injecting packages and agency form creation
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: agencyService,
    private profileservice:ProfileService,
    private location:Location
  ) {
    this.agencyForm = this.fb.group({
      agency_name: ['', Validators.required],
      description: ['', Validators.required],
      services: this.fb.group({
        Tourpackage: [false],
        CustomerSupport: [false],
        TransportationServices: [false],
        HotelReservationServices: [false],
        TravelConsultationandAdvice: [false],
      },{ validators: this.requireAtLeastOneService }),
      contactNumber1: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      contactNumber2: ['', Validators.pattern('[0-9]{10}')],
      aboutAgency: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

// ng oninit  getting profile if it is availabe and checking token exired
  ngOnInit() {
    this.service.gettoken().subscribe({
      next:(res)=>{
        if(res.expiry){
          this.expiry=res.expiry          
        }  
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    console.log(this.datas);
    
  // getting profile all data
   this.profileSubscription$ = this.profileservice.getingprofile().subscribe({
    next:(res)=>{
      this.datas=res.user

      this.agencyForm.get('agency_name')?.patchValue(res.user.name)
      this.agencyForm.get('description')?.patchValue(res.user.description)
      this.agencyForm.get('contactNumber1')?.patchValue(res.user.contactNumber1)
      this.agencyForm.get('contactNumber2')?.patchValue(res.user.contactNumber2)
      this.agencyForm.get('aboutAgency')?.patchValue(res.user.aboutAgency)
      this.agencyForm.get('email')?.patchValue(res.user.email)
      this.agencyForm.get('openingTime')?.patchValue(res.user.openingTime)
      this.agencyForm.get('closingTime')?.patchValue(res.user.closingTime)
      this.agencyForm.get('location')?.patchValue(res?.user?.location)
      
    },
    error:(err)=>{
      console.log(err);
      
    }
   })
   
  }

// image file change dettector
  changing(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        this.formdata.append('files', files[i]);
      }
    }
  }

  // logo file change dettector
  changingLogo(event: any) {
    const file = event.target.files[0]; 
    if (file) {
      this.formdata.append('logo', file);
    }
  }

  // services updates when the checkbox select
  updateService(serviceName: string, event: any) {
    if (event.target.checked) {
      this.agencyForm.get(`services.${serviceName}`)?.setValue(true);
    } else {
      this.agencyForm.get(`services.${serviceName}`)?.setValue(false);
    }
  }

  // require atleast one selection
  requireAtLeastOneService(control: AbstractControl): { [key: string]: boolean } | null {
    const services = Object.values(control.value);
    const isAtLeastOneSelected = services.some(value => value);
    return isAtLeastOneSelected ? null : { 'atLeastOneFacilityRequired': true };
  }

  // profile add or update submission
  onSubmit() {

    if (this.agencyForm.valid) {

      const one = this.agencyForm.value;
      this.formdata.append('name', one.agency_name);
      this.formdata.append('description', one.description);
      this.formdata.append('services', JSON.stringify(one.services));
      this.formdata.append('contactNumber1', one.contactNumber1);
      this.formdata.append('contactNumber2', one.contactNumber2);
      this.formdata.append('aboutAgency', one.aboutAgency);
      this.formdata.append('email', one.email);
      this.formdata.append('openingTime', one.openingTime);
      this.formdata.append('closingTime', one.closingTime);
      this.formdata.append('location', one.location);

      // profile adding or updating
      this.profileservice.addProfile(this.formdata).subscribe(
        (response) => {
          this.router.navigate(['/agency']);
        },
        (error) => {
          console.error('Error uploading data:', error);
        }
      );
    } else {
      this.message = 'enter the valid data';
    }
    this.formdata = new FormData();
  }

  // logout and token delete
  logout() {
    this.service.agencylogout().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.router.navigate(['authentication']);
  }

  // back to previous page
  back(){
    this.location.back()
  }

  // on distroy
  ngOnDestroy(): void {
      this.profileSubscription$.unsubscribe();
  }
}
