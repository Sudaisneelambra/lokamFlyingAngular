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
export class UserAgencyService {
  constructor(private http: HttpClient, private router:Router ) {}

  private api = 'http://localhost:3000';
  

  gettingagencies():Observable<any>{
    return this.http.get(`${this.api}/user/getagencies`)
  }

  getsingleagency(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/getingsingleagency/${id}`)
  }
  
}
