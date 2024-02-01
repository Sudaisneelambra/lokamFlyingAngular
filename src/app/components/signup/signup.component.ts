import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/commonSignup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  already:any
  otp:any={}

  // creation of a variable
  userForm!: FormGroup;

  // injecting formbuilder
  constructor(private fb: FormBuilder,private userService:UserService) { }


  // create scheme using form group
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern("^[a-z]*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]],
      phoneNumber: ['', [Validators.required]],
      role: this.fb.group({
        user: [''],
        agency: ['' ]
      },{ validators: this.roleRequiredValidator })
    });
  }

  // radio button required check
  roleRequiredValidator(group: FormGroup) {
    const user = group.get('user');
    const admin = group.get('agency');

    if (!user?.value && !admin?.value) {
      return { roleRequired: true };
    }

    return null;
  }

  // get all controls of the form group
  get f(){
    return this.userForm.controls
  }

  submitted:boolean=false

  // submittision of form
  onSubmit(): void {
    this.submitted=true

    this.userService.userSignupPost(this.userForm.value).subscribe({
      next:(res:any)=>{
        if (res.otpsend){
            this.otp=res
            setTimeout(()=>{
              this.otp=""
            },4000)
          }
       else{
        this.already=res.message
        setTimeout(()=>{
          this.already=""
        },4000)

       }

        console.log(res);
      },
      error:(err)=>{
        console.log(err);
        alert(err.error.message);
      }
    })
  }


  // radio button value storing
  onCheckboxChange(event: any, role: string) {
    const checked = event.target.checked;
    const roleForm = this.userForm.get('role');
    if(roleForm)
    {
      if (role === 'user') {
        roleForm.get('user')!.setValue(checked);
        roleForm.get('agency')!.setValue('');
      } else if (role === 'agency') {
        roleForm.get('agency')!.setValue(checked);
        roleForm.get('user')!.setValue('');

      }
    }
    
  }

  
}
