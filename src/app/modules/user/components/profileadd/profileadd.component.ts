import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector:'app-profileadd',
    templateUrl:'./profileadd.component.html',
    styleUrls:['./profileadd.component.css']
})

export class ProfileAdd{
    userProfileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      fullName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: this.fb.group({
        houseNo: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern(/\d{10}/)]],
      nationality: ['', Validators.required],
      dateOfBirth: ['', [Validators.required]],
      zipCode: ['', Validators.pattern(/\d{5}/)],
    });
  }

  // Handle form submission
  onSubmit() {
    // Process the form data and perform actions (e.g., send to server)
    console.log(this.userProfileForm.value);
  }
}