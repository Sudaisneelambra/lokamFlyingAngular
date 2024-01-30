import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  userForm!: FormGroup;
 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern("^[a-z]*$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern("^(1[8-9]|[2-9][0-9]|[1-9][0-9]{2,})$")]],
      phoneNumber: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      role: this.fb.group({
        user: [false],
        admin: [false ]
      },{ validators: this.roleRequiredValidator })
    });
  }

  roleRequiredValidator(group: FormGroup) {
    const user = group.get('user');
    const admin = group.get('admin');

    if (!user?.value && !admin?.value) {
      return { roleRequired: true };
    }

    return null;
  }
  
  get f(){
    return this.userForm.controls
  }



  submitted:boolean=false

  onSubmit(): void {
    this.submitted=true

    console.log(this.f);
    
    console.log(this.userForm.value);
    
    
  }

  onCheckboxChange(event: any, role: string) {
    const checked = event.target.checked;
    const roleForm = this.userForm.get('role');
    if(roleForm)
    {
      if (role === 'user') {
        roleForm.get('user')!.setValue(checked);
      } else if (role === 'admin') {
        roleForm.get('admin')!.setValue(checked);
      }
    }
    
  }

}
