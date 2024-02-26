import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { admincommon } from "../../services/admincommon.service";
import { PlaceService } from "src/app/modules/agency/services/place.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector:'app-placedetails',
    templateUrl:'./placedetails.component.html',
    styleUrls:['./placedetails.component.css']
})

export class placedetails {
    
  singlePlacedata!: any;
  selectedIndex = 0;
  bool = true;
  control = true;
  val = true;
  images: any;
  modaldelete!: boolean;
  modalEdit!: boolean;
  deleteId!: any;
  editId!: any;

  singleplace$= new Subscription()
  
  // constructor for injecting services
  constructor(
    private service: admincommon,
    private placeservice: PlaceService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  // oninit for getting single place
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      // getting all detials of specific place
     this.singleplace$ = this.placeservice.getsingleplace(id).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login')
            this.service.agencylogout()
          } else {
            this.singlePlacedata = res.data;
            this.images = res.data.placeurl;
          }
        },
        error: (err) => {
          this.router.navigate(['/error']);
        },
      });
    });
    // auto carosel
    if (this.val) {
      this.auto();
    }
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

  // back to previous location
  back() {
    this.location.back();
  }

  // distroing component
  ngOnDestroy(): void {
    this.singleplace$?.unsubscribe()
  }
}