import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userprofileservice } from '../../services/profile.service';
import { useservice } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPackageService } from '../../services/packageservice.service';
import { packageService } from 'src/app/modules/agency/services/package.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit, OnDestroy {


  userdetails$ = new Subscription();
  package$ = new Subscription();
  data: any;
  name = '';
  phonenumber = '';
  email = '';
  address = '';
  street = '';
  housenumber = '';
  state = '';
  district = '';
  zipcode = '';
  singlepackage: any;
  price=''
  prs:any

  constructor(
    private profileservice: userprofileservice,
    private service: useservice,
    private router: Router,
    private rout: ActivatedRoute,
    private packageservice: UserPackageService
  ) {}

  ngOnInit(): void {
    this.rout.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      if (id) {
        this.package$ = this.packageservice.getsinglepackage(id).subscribe({
          next: (res) => {
            if (res.expiry) {
              alert('session expired please login');
              this.service.userlogout();
            } else {
              this.singlepackage = res.data[0];
              this.prs=parseInt(this.singlepackage.packagePrice)
              this.price=this.singlepackage.packagePrice
              console.log(this.singlepackage);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });

    this.userdetails$ = this.profileservice.getprofile().subscribe({
      next: (res) => {
        if (res.expiry) {
          alert('session expired or internal error please login');
          this.service.userlogout();
        } else {
          if (res.success) {
            this.data = res.data;
            if (this.data) {
              this.name = this.data.fullName;
              this.phonenumber = this.data.phoneNumber;
              this.email = this.data.emailAddress;
              this.address = this.data.address;
              this.street = this.data.street;
              this.housenumber = this.data.houseNo;
              this.state = this.data.state;
              this.district = this.data.district;
              this.zipcode = this.data.zipCode;
            }
          }
        }
      },
      error: (err) => {
        console.log(err);
        console.log(err.error.message);
        this.router.navigate(['/user/profileadd']);
      },
    });
  }

  edit(id: any) {
    console.log(id);
    this.router.navigate(['/user/profileadd'], { queryParams: { id } });
  }

  adding(no:any){
    if(no!=='')
    {
        let val= parseInt(no)*this.prs
         this.price=val.toString()
    } else{
        this.price=this.prs
    }
  }

  ngOnDestroy(): void {}
}
