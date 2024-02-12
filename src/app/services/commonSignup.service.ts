import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userapi = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  userSignupPost(data: any) {
    return this.http.post(`${this.userapi}/user/signup`, data, httpOptions);
  }

  userOtpverification(data: any): Observable<any> {
    console.log(data);
    return this.http.post(
      `${this.userapi}/user/signup/otpverification`,
      data,
      httpOptions
    );
  }

  userLogin(data: login): Observable<any> {
    return this.http.post(`${this.userapi}/user/login`, data, httpOptions);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if JWT token exists in localStorage
  }

  gettypeuser() {
    const type = localStorage.getItem('type');
    console.log(type);
    if (type == 'user') {
      return true;
    } else {
      return false;
    }
  }

  gettypeagency() {
    const type = localStorage.getItem('type');
    console.log(type);
    if (type == 'agency') {
      return true;
    } else {
      return false;
    }
  }
}

interface login {
  name: string;
  mail: string;
  pass: string;
}
