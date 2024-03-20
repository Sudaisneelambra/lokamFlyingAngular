import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userapi = environment.backEndurl;
  type:any

  constructor(private http: HttpClient) {}

  // signuping post data
  userSignupPost(data: any) {
    return this.http.post(`${this.userapi}/user/signup`, data, httpOptions);
  }

  // otp verification
  userOtpverification(data: any): Observable<any> {
    return this.http.post(
      `${this.userapi}/user/signup/otpverification`,
      data,
      httpOptions
    );
  }

  // user login
  userLogin(data: login): Observable<any> {
    return this.http.post(`${this.userapi}/user/login`, data, httpOptions);
  }

  // token check
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if JWT token exists in localStorage
  }

  // type user check
  gettypeuser() {
    const type = localStorage.getItem('type');
    if (type == 'user') {
      return true;
    } else {
      return false;
    }
  }

  // type agency check
  gettypeagency() {
    const type = localStorage.getItem('type');
    if (type == 'agency') {
      return true;
    } else {
      return false;
    }
  }
  
  tockendecode(){
    const token= localStorage.getItem('token')
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    
    return JSON.parse(window.atob(base64));
  }



   // type admin check
   gettypeadmin() {
    const type = localStorage.getItem('type');
    if (type == 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getprofileadd() {
    const one = localStorage.getItem('profileadd');
    if (one) {
      if (one === 'true') {
        return true;
      } else if (one === 'false') {
        return false;
      }
    }
    return false;
  }


  getcredentials():Observable<any>{
    return this.http.get(`${this.userapi}/user/getcredentials`)
  }

  loginwithcredential(id:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/loginwithcredential`,{id})
  }
}

interface login {
  name: string;
  mail: string;
  pass: string;
}
