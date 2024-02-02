import { Component, EventEmitter, Input, Output,OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/services/commonSignup.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent{
  constructor(private service:UserService){}

  @Input() boolee!:boolean
  @Input() formdata!:any
  @Output() out=new EventEmitter<boolean>
  message!:any
  otpDigits: string[] = []; // Array to hold individual OTP digits

  onSubmit() {
    const newformdata={otp:this.otpDigits,...this.formdata}

    if(this.otpDigits.length !== 6)
    {
      this.message='enter valid otp'
      setTimeout(()=>{
      this.message=''
      },2000)
    } else{

          this.service.userOtpverification(newformdata).subscribe({
            next:(res)=>{
              if(res.success && res.user)
              {
                this.message=res.message
                console.log(res);
              }
              else if(res.success && res.agency)
              {
                this.message=res.message
                setTimeout(()=>{
                  alert('verification message send to admin ,after the verification of admin u can use the agency dashboard only')
                },1000)
                console.log(res);
              }
              else{
                this.message=res.message
              }
            },
            error:(err)=>{
              console.log(err);
              this.message="otp verification failed"
            }
          })
        }
    }



  display(){
    this.out.emit(false)
    console.log(this.formdata);
    this.formdata=''
  }
}
