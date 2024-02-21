import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agencyService } from '../../services/agency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GuideService } from '../../services/guid.service';

@Component({
  selector: 'app-guide-add',
  templateUrl: './guide-add.component.html',
  styleUrls: ['./guide-add.component.css'],
})
export class GuideAddComponent implements OnInit, OnDestroy {

  guideForm!: FormGroup;
  maximumValue: number = 1;
  selecterfile: File[] = [];
  message!: string;
  id: any;
  singleguide$ = new Subscription();
  guidedata!: any;
  expiry!: any;

  // constructor for injecting services and guid form creation
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private agencyservice: agencyService,
    private guidservice:GuideService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.guideForm = this.formBuilder.group({
      guideName: ['', Validators.required],
      aboutGuide: ['', Validators.required],
      experience: ['', Validators.required],
    });
  }

  // ng oninit token verifying and guid data getting and patchinto form
  ngOnInit(): void {
    this.agencyservice.gettoken().subscribe({
      next: (res) => {
        if (res.expiry) {
          this.expiry = res.expiry;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    // getting queryparams
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        // deleting place from database
        this.singleguide$ = this.guidservice
          .getsingleguide(this.id)
          .subscribe({
            next: (res) => {
              this.guidedata = res.data;
              this.guideForm
                .get('guideName')
                ?.patchValue(this.guidedata.guidename);
              this.guideForm
                .get('aboutGuide')
                ?.patchValue(this.guidedata.aboutguide);
              this.guideForm
                .get('experience')
                ?.patchValue(this.guidedata.experience);
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  // guide adding form submission
  onSubmit() {
    if (this.selecterfile.length < 1) {
      alert('choose one image file');
    } else {
      if (this.guideForm.valid) {
        const data = this.guideForm.value;

        const formdata = new FormData();
        formdata.append('guidename', data.guideName);
        formdata.append('aboutguide', data.aboutGuide);
        formdata.append('experience', data.experience);

        for (const image of this.selecterfile) {
          formdata.append('guideimages', image);
        }

        // adding guide api
        this.guidservice.addguide(formdata).subscribe({
          next: (data) => {
            if (data.success) {
              this.message = data.message;
              setTimeout(() => {
                this.message = '';
                this.router.navigate(['agency/home']);
              }, 2000);
            } else {
              this.message = data.message;
              console.log(this.message);
            }
          },
          error: (err) => {
            console.log(err.message);
          },
        });
      }
    }
  }


  // guide image adding changes dettection
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const maxImages = Math.min(1, event.target.files.length);
      this.selecterfile;
      if (this.selecterfile.length < this.maximumValue) {
        for (let i = 0; i < maxImages; i++) {
          this.selecterfile.push(event.target.files[i]);
        }
      } else {
        alert(`You can only select up to ${this.maximumValue} images.`);
      }
    }
  }


  // guide editting
  edit() {
    if (this.selecterfile.length < 1) {
      alert('choose one image file');
    } else {
      if (this.guideForm.valid) {
        const data = this.guideForm.value;

        const formdata = new FormData();
        console.log(this.guideForm.value);
        formdata.append('guidename', data.guideName);
        formdata.append('aboutguide', data.aboutGuide);
        formdata.append('experience', data.experience);
        formdata.append('id', this.id);

        for (const image of this.selecterfile) {
          formdata.append('guideimages', image);
        }

        // editing guide api
        this.guidservice.editguide(formdata).subscribe({
          next: (data) => {
            if (data.success) {
              this.message = data.message;
              setTimeout(() => {
                this.message = '';
                this.router.navigate(['agency/home']);
              }, 2000);
            } else {
              this.message = data.message;
            }
          },
          error: (err) => {
            console.log('minnan');
          },
        });
      }
    }
  }


  // deleting added image file
  del() {
    if (this.selecterfile.length > 0) {
      if (
        window.confirm('Are you sure you want to delete the selected file?')
      ) {
        this.selecterfile.pop();
        alert('deleted successfully');
      }
    } else {
      alert('no file choosed');
    }
  }

  // back to previous location
  back() {
    this.location.back();
  }

  // on destroy
  ngOnDestroy(): void {
    this.singleguide$.unsubscribe();
  }
}
