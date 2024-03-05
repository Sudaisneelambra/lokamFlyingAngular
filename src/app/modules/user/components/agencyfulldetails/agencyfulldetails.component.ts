import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { useservice } from "../../services/user.service";
import { UserPlaceService } from "../../services/placeservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { UserAgencyService } from "../../services/agencyservice.service";
import { PlaceService } from "src/app/modules/agency/services/place.service";
import { UserPackageService } from "../../services/packageservice.service";
import { userprofileservice } from "../../services/profile.service";

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
    rate: any;
    reviewdata: any;
    emty=''
    profile$ = new Subscription();
    review$ =new Subscription();
    reviewget$= new Subscription();
    fullreview: any;
    boolean=true

  
    // constructor for injecting services
    constructor(
      private service: useservice,
      private useragencyservice: UserAgencyService,
      private location: Location,
      private router: Router,
      private route: ActivatedRoute,
      private placeservice:UserPlaceService,
      private packageservice:UserPackageService,
      private profileservice:userprofileservice
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
              
            }
          },
          error: (err) => {
            this.router.navigate(['/error']);
          },
        });

        // review

        this.reviewget$ = this.service.getingagencyreview(id).subscribe({
          next:(res)=>{
            if (res.expiry) {
              alert('session expired please login');
              this.service.userlogout();
            } else {
              if(res.success){
                this.fullreview=res.data
              } else {
                console.log(res.message);
                
              }
            }
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
  

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

    fullreviewagency(){
      if(this.boolean){
        this.boolean=false
      } else{
        this.boolean=true
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

    rating(event: any) {
      this.rate = event; 
    }

    review(value: any) {
      this.reviewdata = value;
    }

    submitreview(id:any){
      if (this.reviewdata !== '' && this.rate > 0) {
        const data = { rating: this.rate, comment: this.reviewdata ,agencyid: id};
        this.profile$ = this.profileservice.getprofile().subscribe({
          next: (res) => {
            if (res.expiry) {
              alert('session expired please login');
              this.service.userlogout();
            } else {
              this.review$ = this.service.agencyreview(data).subscribe({
                next: (res) => {
                  if (res.expiry) {
                    alert('session expired please login');
                    this.service.userlogout();
                  } else {
                    if (res.success) {
                      alert(res.message);
                      this.emty=''
                      this.service.starfilling.next(0)
                       setTimeout(() => {
                        this.router.navigateByUrl('/user',{skipLocationChange: true}).then(()=>{
                          this.router.navigate(['/user/agencyfulldetails/',id])
                        })
                        }, 2000);
                    } else {
                      alert(res.message);
                    }
                  }
                },
                error: (err) => {
                  console.log(err);
                },
              });
            }
          },
          error: (err) => {
            this.emty=''
            this.service.starfilling.next(0)
            this.router.navigate(['/user/profileadd']);
          },
        });
      } else {
        alert('write review and rate ');
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