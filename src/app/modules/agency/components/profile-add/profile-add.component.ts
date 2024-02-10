import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agencyService } from '../../services/agency.service';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.css']
})
export class ProfileAddComponent {


  message!:string
  agencyForm: FormGroup;
  formdata=new FormData()
  photosArray: File[] = [];

  constructor(private fb: FormBuilder, private agency: agencyService) {
    this.agencyForm = this.fb.group({
      agency_name: ['', Validators.required],
      description: ['', Validators.required],
      services: this.fb.group({
        Tourpackage: [false],
        CustomerSupport: [false],
        TransportationServices: [false],
        HotelReservationServices: [false],
        TravelConsultationandAdvice: [false]
      }),
      contactNumber1: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      contactNumber2: ['', Validators.pattern('[0-9]{10}')],
      aboutAgency: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      location: ['', Validators.required]
    });
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
    
    if(this.agencyForm.valid)
    {
      console.log('valid');
      
      const one=this.agencyForm.value
      this.formdata.append('name',one.agency_name)
      this.formdata.append('description',one.description)
      this.formdata.append('services', JSON.stringify(one.services));
      this.formdata.append('contactNumber1',one.contactNumber1)
      this.formdata.append('contactNumber2',one.contactNumber2)
      this.formdata.append('aboutAgency',one.aboutAgency)
      this.formdata.append('email',one.email)
      this.formdata.append('openingTime',one.openingTime)
      this.formdata.append('closingTime',one.closingTime)
      this.formdata.append('location',one.location)
      console.log(this.agencyForm.value);
      // Make HTTP POST request to the server
      this.agency.addProfile(this.formdata)
      .subscribe(
        response => {
          console.log('Response from server:', response);
        },
        error => {
          console.error('Error uploading data:', error);
        }
        );


      } else{
        this.message="enter the valid data"
      }
    this.formdata=new FormData()

    }
}
