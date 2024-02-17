import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class agencyService {
  constructor(private http: HttpClient) {}
  
  private api = 'http://localhost:3000';
  
  private userapi = 'http://localhost:3000';
  
  singleplace= new BehaviorSubject(null)
  singleguide= new BehaviorSubject(null)


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

  getsingleplace(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/getsingleplace/${id}`)
  }

  deletingPlace(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deleteplace/${id}`)
  }

  getsingleguide(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/getsingleguide/${id}`)
  }
  

  agencylogout(): Observable<any> {
    const one = localStorage.getItem('token');
    console.log(one);

    localStorage.clear()
    return this.http.get(`${this.userapi}/user/logout`);
  }
}
