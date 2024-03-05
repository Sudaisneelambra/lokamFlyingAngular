import { Component, OnDestroy, OnInit } from '@angular/core';
import { useservice } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { userprofileservice } from '../../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  reviewdata: any;
  fullreview:any
  rate: any;
  review$ = new Subscription();
  profile$ = new Subscription();
  reviewget$ = new Subscription();
  emty=''
  bool=true

  constructor(
    private service: useservice,
    private profileservice: userprofileservice,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.reviewget$ = this.service.gettingpagereview().subscribe({
      next:(res)=>{
        if (res.expiry) {
          alert('session expired please login');
          this.service.userlogout();
        } else {
          if(res.success){
            this.fullreview=res.data
            console.log(this.fullreview);
          } else {
            console.log(res.message);
            
          }
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })

  }

  fullreviewagency(){
    if(this.bool){
      this.bool=false
    } else{
      this.bool=true
    }
  }

  rating(event: any) {
    this.rate = event;
  }

  review(value: any) {
    this.reviewdata = value;
  }

  submitreview() {
    if (this.reviewdata !== '' && this.rate > 0) {
      const data = { rating: this.rate, comment: this.reviewdata };
      console.log(data);
      this.profile$ = this.profileservice.getprofile().subscribe({
        next: (res) => {
          if (res.expiry) {
            alert('session expired please login');
            this.service.userlogout();
          } else {
            this.review$ = this.service.reviewandrating(data).subscribe({
              next: (res) => {
                if (res.expiry) {
                  alert('session expired please login');
                  this.service.userlogout();
                } else {
                  if (res.success) {
                    alert(res.message);
                    this.emty=''
                    this.service.starfilling.next(0)
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

  ngOnDestroy(): void {
    this.review$?.unsubscribe();
    this.profile$?.unsubscribe();
    this.reviewget$?.unsubscribe()
  }
}
