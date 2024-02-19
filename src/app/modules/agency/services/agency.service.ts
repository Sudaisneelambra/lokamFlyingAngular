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
 
  singleguide= new BehaviorSubject(null)


  // getting profile name
  getingprofilename():Observable<any>{
    return this.http.get(`${this.api}/agency/profilenameget`)
  }

  // profile adding or updating
  addProfile(data: any): Observable<any> {
    return this.http.post(`${this.api}/agency/profileadd`, data);
  }
  // add place api
  addplace(data:any):Observable<any>{
    return this.http.post(`${this.api}/agency/placeadd`,data)
  }

  // adding guide api
  addguide(data:any):Observable<any>{
    return this.http.post(`${this.api}/agency/guideadd`,data)
  }
  // getting profile all data
  getingprofile():Observable<any>{
    return this.http.get(`${this.api}/agency/profileget`)
  }

  // all place getting api
  gettingplace():Observable<any>{
    return this.http.get(`${this.api}/agency/getplace`)
  }

  //all place getting api
  gettingguides():Observable<any>{
    return this.http.get(`${this.api}/agency/getguide`)
  }

  // getting all detials of specific place
  getsingleplace(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/getsingleplace/${id}`)
  }

  // deleting place from database
  deletingPlace(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deleteplace/${id}`)
  }

  // deleting guide from database
  deletingGuide(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deleteguide/${id}`)
  }

  // edit place api
  editplace(data:any):Observable<any>{
    return this.http.put(`${this.api}/agency/editplace`,data)
  }
// edit guide api
  editguide(data:any):Observable<any>{
    return this.http.put(`${this.api}/agency/editguide`,data)
  }

  // getting all detials of specific guide
  getsingleguide(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/getsingleguide/${id}`)
  }

  // package adding api
  addpackage(data:any):Observable<any>{
    console.log(data);
    return this.http.post(`${this.api}/agency/packageadd`,data)
  }
  

  // logout and token delete
  agencylogout(): Observable<any> {
    const one = localStorage.getItem('token');
    console.log(one);

    localStorage.clear()
    return this.http.get(`${this.userapi}/user/logout`);
  }
}
