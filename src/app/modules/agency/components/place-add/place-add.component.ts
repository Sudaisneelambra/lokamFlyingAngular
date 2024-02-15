import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { agencyService } from '../../services/agency.service';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent {

  placeForm: FormGroup;
  maxImagesAllowed: number = 5;
  message!:string
  selectedImages: File[] = [];

  constructor(private formBuilder: FormBuilder ,private router:Router ,private location :Location , private service:agencyService) {
    // Initialize the form
    this.placeForm = this.formBuilder.group({
      placeName: ['', Validators.required],
      placeDescription: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      entryFee: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  // Handle form submission
  onSubmit() {
    if(this.selectedImages.length < 5){
      this.message="please select minimum and maximum 5photos"
      console.log('loggg');
      
    }else if (this.placeForm.valid) {
      const formData = new FormData();
      formData.append('placeName', this.placeForm.value.placeName);
      formData.append('placeDescription', this.placeForm.value.placeDescription);
      formData.append('openingTime', this.placeForm.value.openingTime);
      formData.append('closingTime', this.placeForm.value.closingTime);
      formData.append('entryFee', this.placeForm.value.entryFee);
      formData.append('location', this.placeForm.value.location);
      
      // Append selected images

      for (const image of this.selectedImages) {
        formData.append('images', image);
      }

      this.service.addplace(formData).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.success){
            this.router.navigate(['agency'])
          }else {
            this.message=res.message
          }          
        },
        error:(err)=>{
          console.log(err);
        }
      })


    } else {
      console.log('Form is invalid or no images selected');
    }
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {

      const maxImages = Math.min(5, event.target.files.length);
      if (this.selectedImages.length < this.maxImagesAllowed) {
          for (let i = 0; i < maxImages; i++) {
            this.selectedImages.push(event.target.files[i]);
            console.log(this.selectedImages);
          }
          console.log(this.selectedImages);
      } else{
        alert(`You can only select up to ${this.maxImagesAllowed} images.`);
      }
      }
    
  }


  back(){
      this.location.back()
  }
}
