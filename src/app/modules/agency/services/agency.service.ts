import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class agencyService {
  constructor(private http: HttpClient) {}

  private api = 'http://localhost:3000';
  
  private userapi = 'http://localhost:3000';

  getingprofile():Observable<any>{
    return this.http.get(`${this.api}/agency/profileget`)
  }

  addProfile(data: any): Observable<any> {
    return this.http.post(`${this.api}/agency/profileadd`, data);
  }

  addplace(data:any):Observable<any>{
    return this.http.post(`${this.api}/agency/placeadd`,data)
  }

  addguide(data:any):Observable<any>{
    return this.http.post(`${this.api}/agency/guideadd`,data)
  }


  gettingplace():Observable<any>{
    return this.http.get(`${this.api}/agency/getplace`)
  }
  gettingguides():Observable<any>{
    return this.http.get(`${this.api}/agency/getguide`)
  }


  agencylogout(): Observable<any> {
    const one = localStorage.getItem('token');
    console.log(one);

    localStorage.clear()
    return this.http.get(`${this.userapi}/user/logout`);
  }
}
