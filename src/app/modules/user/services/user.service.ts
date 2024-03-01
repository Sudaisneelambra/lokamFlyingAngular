import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    console.log(one);

    localStorage.clear()
    this.router.navigate(['/authentication'])
    
  }


  createorder(data:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/create-order`,data)
  }

  bookingpayment(data:any):Observable<any>{
    return this.http.post(`${this.userapi}/user/bookingpayment`,data)
  }

  checkingalraedybooked(id:any):Observable<any>{
    return this.http.get(`${this.userapi}/user/checkingalraedybooked/${id}`)
  }

  
}
