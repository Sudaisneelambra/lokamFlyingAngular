import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userprofileservice } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { useservice } from '../../services/user.service';

@Component({
  selector: 'app-profileadd',
  templateUrl: './profileadd.component.html',
  styleUrls: ['./profileadd.component.css'],
})
export class ProfileAdd implements OnInit, OnDestroy {
  msg: any;
  addprofile$ = new Subscription();
  profilegetting$ = new Subscription();
  userProfileForm!: FormGroup;
  data: any;

  constructor(
    private fb: FormBuilder,
    private profileservice: userprofileservice,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private service: useservice
  ) {
    this.userProfileForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/\d{10}/)]],
      nationality: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
      houseNo: ['', Validators.required],
      street: ['', Validators.required],
      zipCode: ['', Validators.pattern(/\d{6}/)],
      district: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      if (id) {
        this.profilegetting$ = this.profileservice.getprof(id).subscribe({
          next: (res) => {
            if (res.expiry) {
              alert('session expired or internal error please login');
              this.service.userlogout();
            } else {
              if (res.success) {
                this.data = res.data;
                if (this.data) {
                  this.userProfileForm
                    .get('fullName')
                    ?.patchValue(this.data?.fullName);
                  this.userProfileForm
                    .get('emailAddress')
                    ?.patchValue(this.data?.emailAddress);
                  this.userProfileForm
                    .get('address')
                    ?.patchValue(this.data?.address);
                  this.userProfileForm
                    .get('phoneNumber')
                    ?.patchValue(this.data?.phoneNumber);
                  this.userProfileForm
                    .get('nationality')
                    ?.patchValue(this.data?.nationality);
                  this.userProfileForm
                    .get('dateOfBirth')
                    ?.patchValue(this.data?.dateOfBirth);
                  this.userProfileForm
                    .get('houseNo')
                    ?.patchValue(this.data?.houseNo);
                  this.userProfileForm
                    .get('street')
                    ?.patchValue(this.data?.street);
                  this.userProfileForm
                    .get('zipCode')
                    ?.patchValue(this.data?.zipCode);
                  this.userProfileForm
                    .get('district')
                    ?.patchValue(this.data?.district);
                  this.userProfileForm
                    .get('state')
                    ?.patchValue(this.data?.state);
                }
              }
            }
          },
          error: (err) => {
            console.log(err);
            console.log(err.message);
          },
        });
      }
    });
  }

  submit() {
    if (!this.userProfileForm.valid) {
      this.msg = 'form is not valid ,please fill correctly';
      console.log('validalla');
    } else {
      console.log('validan');
      console.log(this.userProfileForm.value);
      this.addprofile$ = this.profileservice
        .postuserdata(this.userProfileForm.value)
        .subscribe({
          next: (res) => {
            if (res.expiry) {
              alert('session expired or internal error please login');
              this.service.userlogout();
            } else {
              if (res.success) {
                this.msg = res.message;
                setTimeout(() => {
                  this.router.navigate(['/user/profile']);
                }, 2000);
              }
            }
          },
          error: (err) => {
            console.log(err);
            this.msg = err.message;
          },
        });
    }
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.addprofile$?.unsubscribe();
    this.profilegetting$?.unsubscribe();
  }
}
