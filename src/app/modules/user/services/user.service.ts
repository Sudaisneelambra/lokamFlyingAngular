import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class useservice {
  constructor(private http: HttpClient, private router:Router ) {}

  private userapi = 'http://localhost:3000';

   // logout and token delete
   userlogout(){
    const one = localStorage.getItem('token');
    localStorage.clear()
    this.router.navigate(['/authentication'])
    
  }

   starfilling = new BehaviorSubject(0)


  createorder(data:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/create-order`,data)
  }

  bookingpayment(data:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/bookingpayment`,data)
  }

  checkingalraedybooked(id:any):Observable<any>{
    return this.http.get(`${this.userapi}/user/checkingalraedybooked/${id}`)
  }

  reviewandrating(data:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/reviewandrating`,{data})
  }

  agencyreview(data:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/agencyreview`,{data})
  }

  gettingpagereview():Observable<any>{
    return this.http.get(`${this.userapi}/user/gettingpagereview`)
  }

  getingagencyreview(id:any):Observable<any>{
    return this.http.get(`${this.userapi}/user/getingagencyreview/${id}`)
  }

  getguide():Observable<any>{
    return this.http.get(`${this.userapi}/user/getguide`)
  }

  getbooking():Observable<any>{
    return this.http.get(`${this.userapi}/user/bookingdetails`)

  }
  
}
