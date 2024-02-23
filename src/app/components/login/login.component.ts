import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/commonSignup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // creation of a variable
  already: any;
  otp: any = '';
  bool: boolean = false;
  userForm!: FormGroup;
  login!: FormGroup;
  submitted: boolean = false;
  data!: any;
  loginmessage!: string;
  error!: string;

  // dependency injecting
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  // create scheme using form group for signup
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-z]*$')]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/
          ),
        ],
      ],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      role: this.fb.group(
        {
          user: [''],
          agency: [''],
        },
        { validators: this.roleRequiredValidator }
      ),
    });
    // create scheme using form group for login
    this.login = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~]).{8,}$/
          ),
        ],
      ],
    });
  }

  // getting all form controls of login form
  get l() {
    return this.login.controls;
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

  // get all controls of the signup form
  get f() {
    return this.userForm.controls;
  }

  // submittision of signup form
  onSubmit(): void {
    this.submitted = true;

    this.userService.userSignupPost(this.userForm.value).subscribe({
      next: (res: any) => {
        if (res.otpsend) {
          this.otp = res;
          this.bool = true;
          this.data = this.userForm.value;
          setTimeout(() => {
            this.otp = '';
          }, 6000);
        } else {
          this.already = res.message;
          setTimeout(() => {
            this.already = '';
          }, 4000);
        }
      },
      error: (err) => {
        console.log(err);
        alert(err.error.message);
      },
    });
  }

  // otp conponets if case value
  boool(data: any) {
    this.bool = data;
  }

  // logining login form
  logins() {
    this.userService.userLogin(this.login.value).subscribe({
      next: (res) => {
        if (res.success) {
          if (res.user) {
            this.loginmessage = res.message;
            localStorage.setItem('token', res.token); // Store JWT token in localStorage upon successful login
            localStorage.setItem('type', res.type);
            setTimeout(() => {
              this.loginmessage = '';
              this.router.navigate(['user']);
            }, 2000);
          } else if (res.admin) {
            this.loginmessage = res.message;
            localStorage.setItem('token', res.token); // Store JWT token in localStorage upon successful login
            localStorage.setItem('type', res.type);
            setTimeout(() => {
              console.log('admin');
              this.loginmessage = '';
            }, 2000);
          } else if (res.resistered) {
            this.loginmessage = res.message;
            localStorage.setItem('token', res.token); // Store JWT token in localStorage upon successful login
            localStorage.setItem('type', res.type);
            this.router.navigate(['/agency/home'])
            setTimeout(() => {
              this.loginmessage = '';
            }, 2000);
          } else if (!res.resistered) {
            this.error = res.message;
            setTimeout(() => {
              alert(
                'dear costomer ,your verification message send to the admin,but he didnt verified your mail, wait for verification'
              );
              this.error = '';
            }, 2000);
          }
        } else {
          this.error = res.message;
          setTimeout(() => {
            this.error = '';
          }, 2000);
        }
      },
      error: (err) => {},
    });
  }

  // radio button value storing
  onCheckboxChange(event: any, role: string) {
    const checked = event.target.checked;
    const roleForm = this.userForm.get('role');
    if (roleForm) {
      if (role === 'user') {
        roleForm.get('user')!.setValue(checked);
        roleForm.get('agency')!.setValue(false);
      } else if (role === 'agency') {
        roleForm.get('agency')!.setValue(checked);
        roleForm.get('user')!.setValue(false);
      }
    }
  }

  hidePassword = true;

  // pawword hiding function
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
