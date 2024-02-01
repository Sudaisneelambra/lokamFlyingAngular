import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

@Injectable({
    providedIn:'root'
})

export class UserService{
    
    private api = 'http://localhost:3000/user/signup';

constructor(private http:HttpClient){}

userSignupPost(data:any){
    return this.http.post(this.api,data,httpOptions)
}


}