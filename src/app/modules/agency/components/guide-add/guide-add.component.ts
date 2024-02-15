import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agencyService } from '../../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide-add',
  templateUrl: './guide-add.component.html',
  styleUrls: ['./guide-add.component.css']
})
export class GuideAddComponent {


  guideForm!: FormGroup;
  maximumValue:number=1
  selecterfile:File[]=[]
  message!:string
 
  constructor(private formBuilder: FormBuilder, private location:Location, private agencyservice:agencyService , private router:Router) { }

  ngOnInit(): void {
    this.guideForm = this.formBuilder.group({
      guideName: ['', Validators.required],
      aboutGuide: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  onSubmit() {
   if(this.selecterfile.length<1){
    alert('choose one image file')
   } else{
     // Handle form submission here
     if(this.guideForm.valid){
      const data=this.guideForm.value

      const formdata =new FormData()
      console.log(this.guideForm.value);
      formdata.append('guidename', data.guideName)
      formdata.append('aboutguide', data.aboutGuide)
      formdata.append('experience', data.experience)

      for (const image of this.selecterfile) {
        formdata.append('guideimages', image);
      }
      
      this.agencyservice.addguide(formdata).subscribe({
        next:(data)=>{
          console.log(data);
          if(data.success){
            this.router.navigate(['agency'])
          }else {
            this.message=data.message
            console.log(this.message);
            
          }  
        },
        error:(err)=>{
          console.log(err.message);
          console.log('minnan');
          
          
        }
      })
    }
   }
  }

  onFileChange(event:any) {
    // Handle file change (image upload) here
    if(event.target.files && event.target.files.length > 0){
      const maxImages = Math.min(1, event.target.files.length)
      this.selecterfile
      console.log(this.selecterfile);
      if (this.selecterfile.length < this.maximumValue) {
        for (let i = 0; i < maxImages; i++) {
          this.selecterfile.push(event.target.files[i]);
          console.log(this.selecterfile);
        }
    } else{
      alert(`You can only select up to ${this.maximumValue} images.`);
    }
    }
  }

  del(){
   if(this.selecterfile.length>0){
    if (window.confirm('Are you sure you want to delete the selected file?')) {
      this.selecterfile.pop();
      console.log(this.selecterfile);
      alert('deleted successfully')
    }
   } else{
    alert('no file choosed')
   }
  }

  back(){
    this.location.back()
  }
}
