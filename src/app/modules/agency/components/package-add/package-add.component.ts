import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { agencyService } from '../../services/agency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GuideService } from '../../services/guid.service';
import { PlaceService } from '../../services/place.service';
import { packageService } from '../../services/package.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.css'],
})
export class PackageAddComponent implements OnInit, OnDestroy {
  packageForm!: FormGroup;
  booleanvalue: boolean = false;
  guides!: any[];
  places!: any[];
  selectedplace: any;
  arrivalTime!: any;
  arrivalDate!: any;
  returnTime!: any;
  returnDate!: any;
  addedplaces: any[] = [];
  selectedGuides: any[] = [];
  message!: any;
  expiry: any;

  id: any;
  package: any;
  singlePackage$ =new Subscription();
  addpackage$ =new Subscription()
  getplace$ =new Subscription()
  getguide$ =new Subscription()
  editpackage$=new Subscription()


  // constructor for injecting services and creating package form
  constructor(
    private fb: FormBuilder,
    private location: Location,
    private service: agencyService,
    private guideservice: GuideService,
    private placeservice: PlaceService,
    private packageservice: packageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.packageForm = this.fb.group({
      packageName: ['', Validators.required],
      aboutPackage: ['', Validators.required],
      packagePrice: ['', Validators.required],
      fecilities: this.fb.group(
        {
          Transportation: [false],
          Accommodation: [false],
          Meals: [false],
          ProfessionalGuides: [false],
          LanguageSupport: [false],
          TravelInsurance: [false],
          CustomerSupport: [false],
        },
        { validators: this.requireAtLeastOneFacility }
      ),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      offer: ['', Validators.required],
      offerRate: [''],
      maximumCapacity: ['', Validators.required],
      availableSlot: ['', Validators.required],
    });
  }

  // ng on init token expiry checking
  ngOnInit(): void {
    // getting queryparams
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        // deleting place from database
        this.singlePackage$ = this.packageservice
          .getsinglepackage(this.id)
          .subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired please login');
                this.service.agencylogout();
              } else {
                this.package = res.package;
                this.packageForm
                  .get('packageName')
                  ?.patchValue(this.package.packageName);
                this.packageForm
                  .get('aboutPackage')
                  ?.patchValue(this.package.aboutPackage);
                this.packageForm
                  .get('packagePrice')
                  ?.patchValue(this.package.packagePrice);
                this.packageForm
                  .get('startDate')
                  ?.patchValue(this.package.startDate);
                this.packageForm
                  .get('endDate')
                  ?.patchValue(this.package.endDate);
                this.packageForm
                  .get('maximumCapacity')
                  ?.patchValue(this.package.maximumCapacity);
                this.packageForm
                  .get('availableSlot')
                  ?.patchValue(this.package.availableSlot);
                this.packageForm.get('offer')?.patchValue(this.package.offer);
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  // deleting added place
  deleteAddedPlace(id: any) {
    const indexToRemove = this.addedplaces.findIndex((m) => m.placeId === id);
    if (indexToRemove !== -1) {
      this.addedplaces.splice(indexToRemove, 1);
    }
  }

  // required atleast one
  requireAtLeastOneFacility(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const facilities = Object.values(control.value);
    const isAtLeastOneSelected = facilities.some((value) => value);
    return isAtLeastOneSelected ? null : { atLeastOneFacilityRequired: true };
  }

  // package form submitting
  onSubmit() {
    if (
      !this.packageForm.valid ||
      (this.addedplaces && this.addedplaces.length < 1) ||
      (this.selectedGuides && this.selectedGuides.length < 1)
    ) {
      alert('choose the required datas');
    } else {
      const fulldata = {
        mainform: this.packageForm.value,
        places: this.addedplaces,
        guid: this.selectedGuides,
      };
     this.addpackage$= this.packageservice.addpackage(fulldata).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else{
            this.message = res.message;
            setTimeout(() => {
              this.message = '';
              this.router.navigate(['agency/home']);
            }, 3000);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // checking offer is valid
  onOfferChange(event: any, boolean: string) {
    if (boolean == 'yes') {
      this.booleanvalue = true;
    } else if ((boolean = 'no')) {
      this.booleanvalue = false;
      this.packageForm.get('offerRate')?.patchValue('');
    }
  }

  // update fecility
  updatefecility(serviceName: string, event: any) {
    if (event.target.checked) {
      this.packageForm.get(`fecilities.${serviceName}`)?.setValue(true);
    } else {
      this.packageForm.get(`fecilities.${serviceName}`)?.setValue(false);
    }
  }

  // back to previous page
  back() {
    this.location.back();
  }

  // getting all places
  getplace() {
   this.getplace$= this.placeservice.gettingplace().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login')
          this.service.agencylogout()
        } else{
          this.places = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // getting guides
  guidess() {
   this.getguide$= this.guideservice.gettingguides().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login')
          this.service.agencylogout()
        } else{
          this.guides = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // selecting place
  selectPlace(place: any) {
    const filter = this.addedplaces.filter((m) => {
      return m.placename == place.placeName;
    });
    if (filter && filter.length > 0) {
      alert('you already selected this place ..choose athother place');
      this.selectedplace = null;
    } else {
      this.selectedplace = place;
    }
  }

  // adding place
  adding() {
    if (
      this.selectPlace == null ||
      this.arrivalTime == null ||
      this.returnTime == null ||
      (this.returnDate == null && this.arrivalDate == null)
    ) {
      alert('please add the fields');
    } else {
      const place = {
        placeId: this.selectedplace._id,
        placename: this.selectedplace.placeName,
        arrivalDate: this.arrivalDate,
        arrivingtime: this.arrivalTime,
        returnDate: this.returnDate,
        returntime: this.returnTime,
      };
      this.addedplaces.push(place);
      this.selectedplace = null;
      this.arrivalTime = null;
      this.returnTime = null;
      this.arrivalDate = null;
      this.returnDate = null;
    }
  }

  // guide selection
  toggleGuideSelection(guide: any) {
    const index = this.selectedGuides.findIndex(
      (selectedGuide) => selectedGuide.id === guide._id
    );
    if (index > -1) {
      // If the guide is already selected, remove it from the selectedGuides array
      this.selectedGuides.splice(index, 1);
    } else {
      const guides = { id: guide._id, name: guide.guidename };
      // If the guide is not selected, add it to the selectedGuides array
      this.selectedGuides.push(guides);
    }
  }

  // editting package
  edit() {
    if (
      !this.packageForm.valid ||
      (this.addedplaces && this.addedplaces.length < 1) ||
      (this.selectedGuides && this.selectedGuides.length < 1)
    ) {
      alert('choose the required datas');
    } else {
      const fulldata = {
        mainform: this.packageForm.value,
        places: this.addedplaces,
        guid: this.selectedGuides,
        id: this.id,
      };
     this.editpackage$= this.packageservice.edipackage(fulldata).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else{
            this.message = res.message;
            setTimeout(() => {
              this.message = '';
              this.router.navigate(['agency/home']);
            }, 3000);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  // on destroy
  ngOnDestroy(): void {
    this.singlePackage$?.unsubscribe();
    this.addpackage$?.unsubscribe()
    this.getplace$?.unsubscribe()
    this.getguide$?.unsubscribe()
    this.editpackage$?.unsubscribe()

  }
}