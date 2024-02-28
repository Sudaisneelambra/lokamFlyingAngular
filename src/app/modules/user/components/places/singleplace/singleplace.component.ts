import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserPlaceService } from "../../../services/placeservice.service";
import { useservice } from "../../../services/user.service";

@Component({
    selector:'app-singleplace',
    templateUrl:'./singleplace.component.html',
    styleUrls:['./singleplace.component.css']
})

export class SinglePlaceComponent implements OnInit,OnDestroy{

    singlePlacedata!: any;
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
  
    // constructor for injecting services
    constructor(
      private service: useservice,
      private userplaceservice: UserPlaceService,
    //   private location: Location,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
  
    // oninit for getting single place
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = params['id'];
    //     // getting all detials of specific place
       this.singleplace$ = this.userplaceservice.getsingleplace(id).subscribe({
          next: (res) => {
            if (res.expiry) {
              alert('session expired please login')
              this.service.userlogout()
            } else {
              this.singlePlacedata = res.data[0];
              this.images = res.data[0].placeurl;
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
  
    // distroing component
    ngOnDestroy(): void {
      this.singleplace$?.unsubscribe()
    }

}