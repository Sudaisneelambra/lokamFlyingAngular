import { Component } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {

  otpDigits: string[] = []; // Array to hold individual OTP digits

  onSubmit() {
    // Concatenate the individual digits to form the OTP
    
    console.log(this.otpDigits);
    
    // Process the OTP as needed (e.g., send it to the server for validation)
    
  }
}
