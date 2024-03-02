import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { userprofileservice } from '../../services/profile.service';
import { useservice } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPackageService } from '../../services/packageservice.service';

declare var Razorpay: any;

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
  price: any;
  prs: any;
  message: any;
  orderid: any;
  persons:any
  order$ = new Subscription();
  alredybooked$ = new Subscription;

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
              this.prs = parseInt(this.singlepackage.packagePrice);
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

  adding(no: any) {
    if (no !== '') {
      let val = parseInt(no) * this.prs;
      this.price = val.toString();
    } else {
      this.price = '';
    }
  }

  payment() {
    if (this.price > 0) {
      const paymentdata = {
        price: this.price,
        agencyid: this.singlepackage?.agencydetails[0]?._id,
        packageid: this.singlepackage?._id,
      };

     this.alredybooked$ = this.service.checkingalraedybooked(this.singlepackage?._id).subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired or internal error please login');
            this.service.userlogout();
          } else {
            if (res.already) {
              console.log('manjumbmal boys');

              this.message = res.message;
              setTimeout(() => {
                this.message = '';
              }, 4000);
            } else {
              this.order$ = this.service.createorder(paymentdata).subscribe({
                next: (res) => {
                  if (res.expiry) {
                    alert('session expired or internal error please login');
                    this.service.userlogout();
                  } else {
                    this.orderid = res.id;
                    console.log(this.orderid);
                    console.log(res);
                    this.initiatePayment();
                  }
                },
                error: (err) => {
                  console.log(err);
                },
              });
            }
          }
        },
        error: (err) => {},
      });
    } else {
      this.message = 'enter the number of persons';
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }

  initiatePayment() {
    const options = {
      key: 'rzp_test_syKfViCsbEGNEz',
      amount: this.price * 100, // Amount in paise
      currency: 'INR',
      name: 'Lokama Flyind',
      image: '/assets/images/logo-no-background.png',
      order_id: this.orderid,
      handler: (response: any) => {
        this.postingdata(response); // Call postingdata() method of the same class
      },
      prefill: {
        name: this.name,
        email: this.email,
        contact: this.phonenumber,
      },
      notes: {
        address: 'Test Address',
      },
      theme: {
        color: 'blue',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  postingdata(data: any) {
    const paymentData = {
      packageid: this.singlepackage._id,
      agencyid: this.singlepackage?.agencydetails[0]?._id,
      price:this.price,
      Noofpersons:this.persons
    };
    const bookingdata = { ...data, ...paymentData };

    this.service.bookingpayment(bookingdata).subscribe({
      next: (res) => {
        if (res.success) {
          alert('your booking success');
          this.router.navigate(['/user/home']);
        } else {
          console.log(res.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.order$?.unsubscribe();
    this.alredybooked$?.unsubscribe()
  }
}
