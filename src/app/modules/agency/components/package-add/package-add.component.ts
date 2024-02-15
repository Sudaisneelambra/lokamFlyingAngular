import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.css']
})
export class PackageAddComponent {

  packageForm!: FormGroup;
  booleanvalue:boolean =false
  guideForm!: FormGroup;
  placeform!:FormGroup;
  guides: { id: number, name: string ,age:number}[] = [];
  places: { id: number, name: string ,age:number}[] = [];


  constructor(private fb: FormBuilder, private location:Location) { }

  ngOnInit(): void {
    this.packageForm = this.fb.group({
      packageName: ['', Validators.required],
      aboutPackage: ['',Validators.required],
      packagePrice: ['', Validators.required],
      fecilities: this.fb.group({
        Transportation: [false],
        Accommodation: [false],
        Meals: [false],
        ProfessionalGuides: [false],
        LanguageSupport: [false],
        TravelInsurance: [false],
        CustomerSupport: [false],

      }, { validators: this.requireAtLeastOneFacility }),
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      offer:['',Validators.required],
      offerRate: [''],
      maximumCapacity: ['', Validators.required],
      availableSlot: ['', Validators.required]
    });




    this.guideForm = this.fb.group({
      selectedGuides: this.fb.array([])
    });

    this.placeform = this.fb.group({
      selectedPlaces: this.fb.array([])
    });
    
    this.guides=[
      // {
      //   id:1,
      //   name:"sudais",
      //   age:21
      // },
      // {
      //   id:2,
      //   name:"sudais",
      //   age:21
      // },
      {
        id:3,
        name:"sudais",
        age:21
      },
      {
        id:4,
        name:"sudais",
        age:21
      },
      {
          id:5,
        name:"sudais",
        age:21
      },
    ]


    this.places=[
      {
        id:1,
        name:"sudais",
        age:21
      },
      {
        id:2,
        name:"sudais",
        age:21
      },
      // {
      //   id:3,
      //   name:"sin",
      //   age:21
      // },
      // {
      //   id:4,
      //   name:"sinn",
      //   age:21
      // },
      // {
      //     id:5,
      //   name:"kunaa",
      //   age:21
      // },
    ]

    this.addCheckboxes()
    this.addPlaceCheckboxes()
  }

   addCheckboxes() {
    const selectedGuidesArray = this.guideForm.get('selectedGuides') as FormArray;
    this.guides.forEach(() => selectedGuidesArray.push(this.fb.control('')));
  }

  addPlaceCheckboxes() {
    const selectedplacesArray = this.placeform.get('selectedPlaces') as FormArray;
    this.guides.forEach(() => selectedplacesArray.push(this.fb.control('')));
  }

  requireAtLeastOneFacility(control: AbstractControl): { [key: string]: boolean } | null {
    const facilities = Object.values(control.value);
    const isAtLeastOneSelected = facilities.some(value => value);
    return isAtLeastOneSelected ? null : { 'atLeastOneFacilityRequired': true };
  }

  onSubmit() {
    // if (this.packageForm.valid) {
    //   console.log(this.packageForm.value); // You can do whatever you want with the form data here
    // } else {
    //   console.error('Form is invalid');
    // }

    const selectedGuideIds = this.guideForm.value.selectedGuides
      .map((checked:any, i:any) => checked ? this.guides[i].id : null)
      .filter((v:any) => v !== null);
    console.log('Selected Guide Ids:', selectedGuideIds);

    const selectedplacesId = this.placeform.value.selectedPlaces
    .map((checked:any, i:any) => checked ? this.places[i].id : null)
    .filter((v:any) => v !== null);
  console.log('Selected place Ids:', selectedplacesId);

    console.log(this.guideForm.value);
    console.log(this.guideForm.value);
    console.log(this.packageForm.value);
    
  }

  updateService(serviceName: string, event: any) {
    // if (event.target.checked) {
    //   this.agencyForm.get(`services.${serviceName}`)?.setValue(true);
    // } else {
    //   this.agencyForm.get(`services.${serviceName}`)?.setValue(false);
    // }
  }

 

  onOfferChange(event:any,boolean:string){
        if(boolean=='yes'){
          this.booleanvalue=true
        } else if( boolean ='no'){
          this.booleanvalue=false
        }
    }


    updatefecility(serviceName: string, event: any) {
      if (event.target.checked) {
        this.packageForm.get(`fecilities.${serviceName}`)?.setValue(true);
      } else {
        this.packageForm.get(`fecilities.${serviceName}`)?.setValue(false);
      }
    }


    back(){
      this.location.back()

    }
}
