import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { packageService } from 'src/app/modules/agency/services/package.service';
import { useservice } from '../../services/user.service';
import { Location } from '@angular/common';
import { UserWishlistService } from '../../services/userwishlist.service';

@Component({
  selector: 'app-singlepackage',
  templateUrl: './singlepackage.component.html',
  styleUrls: ['./singlepackage.component.css'],
})
export class SinglePackegeComponent implements OnInit, OnDestroy {
  singlepackage$ = new Subscription();
  userwishlist$ = new Subscription();
  singlepackage: any;
  places: any;
  objplace: any;
  guide: any;
  result: any[] = [];
  loading: boolean = false;
  boolean=false
  msg:any
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agencypackageservice: packageService,
    private userservice: useservice,
    private location:Location,
    private wishlistservice:UserWishlistService,
    private service:useservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      
      if (id) {
        this.singlepackage$ = this.agencypackageservice
          .getsinglepackage(id)
          .subscribe({
            next: (res) => {
              if (res.expiry) {
                alert('session expired please login');
                this.userservice.userlogout();
              } else {
                this.singlepackage = res.package;

                this.places = res.place;
                this.objplace = this.singlepackage?.places;
                this.guide = res.guide;

                for (let i = 0; i < this.places.length; i++) {
                  for (let j = 0; j < this.places.length; j++) {
                    if (this.places[i]._id === this.objplace[j].placeid) {
                      let joinedObject = {
                        ...this.places[i],
                        ...this.objplace[j],
                      };
                      this.result.push(joinedObject);
                    }
                  }
                }
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
    
  }

  back() {
   this.location.back()
  }


  addToWishlist(id:any): void {
    this.loading = true; // Show loading animation
    // Simulate loading for 2 seconds (you can replace this with your actual functionality)
    setTimeout(() => {
      this.userwishlist$ =this.wishlistservice.addtowishlist(id).subscribe({
        next:(res)=>{
          if (res.expiry) {
            alert('session expired or internal error please login');
            this.service.userlogout();
          } else {
            if(res.success){
              this.loading = false; // Hide loading animation
              this.boolean= true
            } else {
              this.msg=res.message;
              this.loading = false; // Hide loading animation
              setTimeout(()=>{
                this.msg=''
              },3000)
              
            }
          }

        },
        error:(err)=>{
          console.log(err);
          
        }
      })
     
    }, 2000);
  }

  gotoplaces(id: any) {
    this.router.navigate(['/user/places/singleplace',id])
  }

  okey(event:any){
    this.boolean=event
  }

  booking(id:any){
    this.router.navigate(['/user/booking',id])
  }

  isExpired(date:any){
    if(new Date(date)<new Date()){
      return true    
    }else{
      return false
    }
  }
  ngOnDestroy(): void {
    this.userwishlist$?.unsubscribe()
    this.singlepackage$?.unsubscribe();
  }

}
