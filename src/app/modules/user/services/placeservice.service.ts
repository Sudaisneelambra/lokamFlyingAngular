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
export class UserPlaceService {
  constructor(private http: HttpClient, private router:Router ) {}

  private api = 'http://13.201.116.55:3000';

  gettingplace():Observable<any>{
    return this.http.get(`${this.api}/user/getplaces`)
  }
  getsingleplace(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/getsingleplace/${id}`)
  }

  getplace(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/getplace/${id}`)
  }
  
}
