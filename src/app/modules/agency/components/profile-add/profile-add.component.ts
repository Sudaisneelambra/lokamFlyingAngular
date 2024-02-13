import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agencyService } from '../../services/agency.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';
import { useservice } from 'src/app/modules/user/services/user.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

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
  profileSubscription$!: Subscription;

  constructor(
    private fb: FormBuilder,
    private agency: agencyService,
    private router: Router,
    private service: agencyService,
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
      }),
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
  ngOnInit() {
   this.profileSubscription$ = this.agency.getingprofile().subscribe({
    next:(res)=>{
      this.datas=res
      this.agencyForm.get('agency_name')?.patchValue(res.user.name)
      this.agencyForm.get('description')?.patchValue(res.user.description)
      this.agencyForm.get('contactNumber1')?.patchValue(res.user.contactNumber1)
      this.agencyForm.get('contactNumber2')?.patchValue(res.user.contactNumber2)
      this.agencyForm.get('aboutAgency')?.patchValue(res.user.aboutAgency)
      this.agencyForm.get('email')?.patchValue(res.user.email)
      this.agencyForm.get('openingTime')?.patchValue(res.user.openingTime)
      this.agencyForm.get('closingTime')?.patchValue(res.user.closingTime)
      this.agencyForm.get('location')?.patchValue(res.user.location)

      console.log(res.user.name);
      console.log(this.datas);
      

    },
    error:(err)=>{
      console.log(err);
      
    }
   })
   

  }



  changing(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        console.log(fileName);
        this.formdata.append('files', files[i]);
      }
    }

    console.log(this.formdata.getAll('files'));
  }

  changingLogo(event: any) {
    const file = event.target.files[0]; // Assuming only one file is selected for logo
    if (file) {
      this.formdata.append('logo', file);
    }
  }

  updateService(serviceName: string, event: any) {
    if (event.target.checked) {
      this.agencyForm.get(`services.${serviceName}`)?.setValue(true);
    } else {
      this.agencyForm.get(`services.${serviceName}`)?.setValue(false);
    }
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.agencyForm.value);

    if (this.agencyForm.valid) {
      console.log('valid');

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
      console.log(this.agencyForm.value);
      // Make HTTP POST request to the server
      this.agency.addProfile(this.formdata).subscribe(
        (response) => {
          console.log('Response from server:', response);
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

  back(){
    this.location.back()
  }

  ngOnDestroy(): void {
      this.profileSubscription$.unsubscribe();
  }
}
