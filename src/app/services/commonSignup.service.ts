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
    
    private signupapi = 'http://localhost:3000/user/signup';

    private otppost = 'http://localhost:3000/user/signup/otpverification';


constructor(private http:HttpClient){}

userSignupPost(data:any){
    return this.http.post(this.signupapi,data,httpOptions)
}

userOtpverification(data:any):Observable<any>{
    console.log(data);
    return this.http.post(this.otppost,data,httpOptions)

}


}