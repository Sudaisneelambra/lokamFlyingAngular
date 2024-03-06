import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnChanges {
  constructor(private service: UserService, private router: Router) {}

  @Input() boolee!: boolean;
  @Input() formdata!: any;
  @Output() out = new EventEmitter<boolean>();
  lastThreeNumbers!: any;
  message!: any;
  otpDigits: string[] = []; 

  // getting last phone number for displaying
  ngOnChanges(changes: SimpleChanges): void {
    this.lastThreeNumbers = this.formdata.phoneNumber.toString().slice(-3);
  }

  // otp form submitting
  onSubmit() {
    const newformdata = { otp: this.otpDigits, ...this.formdata };

    if (this.otpDigits.length !== 6) {
      this.message = 'enter valid otp';
      setTimeout(() => {
        this.message = '';
      }, 2000);
    } else {
      this.service.userOtpverification(newformdata).subscribe({
        next: (res) => {
          if (res.success && res.user) {
            this.message = res.message;
            console.log('go to home');
            localStorage.setItem('token', res.token);
            localStorage.setItem('type', res.type);
            setTimeout(() => {
              this.router.navigate(['/user/home']);
            }, 3000);
          } else if (res.success && res.agency) {
            this.message = res.message;
            setTimeout(() => {
              alert(
                'verification message send to admin ,after the verification of admin you can use the agency dashboard only'
              );
            }, 1000);
            setTimeout(() => {
              this.out.emit(false);
            }, 4000);
          } else {
            this.message = res.message;
            setTimeout(() => {
              this.out.emit(false);
            }, 3000);
          }
        },
        error: (err) => {
          console.log(err);
          this.message = 'otp verification failed';
          setTimeout(() => {
            this.out.emit(false);
          }, 3000);
        },
      });
    }
  }
  
// back button from otp component
  display() {
    this.out.emit(false);
    this.formdata = '';
  }
}
