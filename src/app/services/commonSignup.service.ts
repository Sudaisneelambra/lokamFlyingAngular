import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

@Injectable({
    providedIn:'root'
})

export class UserService{
    
    private userapi = 'http://localhost:3000';

    // private otppost = 'http://localhost:3000/user/signup/otpverification';


constructor(private http:HttpClient){}

userSignupPost(data:any){
    return this.http.post(`${this.userapi}/user/signup`,data,httpOptions)
}

userOtpverification(data:any):Observable<any>{
    console.log(data);
    return this.http.post(`${this.userapi}/user/signup/otpverification`,data,httpOptions)

}

userLogin(data:login):Observable<any>{
        return this.http.post(`${this.userapi}/user/login`,data,httpOptions)
}

logout(): void {
  const one= localStorage.getItem('token')
  console.log(one);
  
    localStorage.removeItem('token'); // Remove JWT token from localStorage upon logout
    const tow= localStorage.getItem('token')
    console.log(tow);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if JWT token exists in localStorage
  }


}

interface login{
    name:string,
    mail:string,
    pass:string
}