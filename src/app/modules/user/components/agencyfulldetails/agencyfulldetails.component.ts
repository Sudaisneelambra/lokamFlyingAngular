import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { useservice } from "../../services/user.service";
import { UserPlaceService } from "../../services/placeservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { UserAgencyService } from "../../services/agencyservice.service";
import { PlaceService } from "src/app/modules/agency/services/place.service";
import { UserPackageService } from "../../services/packageservice.service";

@Component({
    selector:'app-agencydetails',
    templateUrl:'./agencyfulldetails.component.html',
    styleUrls:['./agencyfulldetails.component.css']
})

export class AgencyFulldetailsComponent{

    singleagencydata!: any;
    selectedIndex = 0;
    bool = true;
    control = true;
    val = true;
    images: any;
    msg!: string;
    modaldelete!: boolean;
    modalEdit!: boolean;
    deleteId!: any;
    editId!: any;
    singleplace$= new Subscription()
    placeSubscription$ = new Subscription()
    package$= new Subscription()
    data: any;
    packagedata: any;

  
    // constructor for injecting services
    constructor(
      private service: useservice,
      private useragencyservice: UserAgencyService,
      private location: Location,
      private router: Router,
      private route: ActivatedRoute,
      private placeservice:UserPlaceService,
      private packageservice:UserPackageService
    ) {}
  
  
    // oninit for getting single place
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = params['id'];
    //     // getting all detials of specific place
       this.singleplace$ = this.useragencyservice.getsingleagency(id).subscribe({
          next: (res) => {
            if (res.expiry) {
              alert('session expired please login')
              this.service.userlogout()
            } else {
              this.singleagencydata = res.data[0];
              this.images = res.data[0].file_urls;
              console.log(res.data);
              
            }
          },
          error: (err) => {
            this.router.navigate(['/error']);
          },
        });

            // all place getting api
    this.placeSubscription$ = this.placeservice.getplace(id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login')
          this.service.userlogout()
        } else {
          this.data = res.data;
        }
       
      },
      error: (err) => {
        console.log(err.message);
      },
    });

      // all package getting api
      this.package$ = this.packageservice.getpackage(id).subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired please login')
          this.service.userlogout()
        } else {
          this.packagedata = res.data;
          console.log(this.packagedata);
        }
        
      },
      error: (err) => {
        console.log(err.message);
      },
    });




      });
      // auto carosel
      if (this.val) {
        this.auto();
      }

  
    }

    gotoplace(id:any){
      this.router.navigate(['/user/places/singleplace',id])
    }
  
    // carosel function
    selectimge(index: number) {
      this.selectedIndex = index;
    }
  
    // carosel preview button function
    onprevclick() {
      if (this.selectedIndex === 0) {
        this.selectedIndex = this.images?.length - 1;
      } else {
        this.selectedIndex--;
      }
    }
    gotpackage(id:any){
      this.router.navigate(['/user/singlepackage',id])
    }
  
    // carosel next button function
    onnextclick() {
      if (this.selectedIndex === this.images?.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex++;
      }
    }
  
    // auto acrosel
    auto() {
      setInterval(() => {
        this.onnextclick();
      }, 5000);
    }
  
    // distroing component
    ngOnDestroy(): void {
      this.singleplace$?.unsubscribe()
    }


}