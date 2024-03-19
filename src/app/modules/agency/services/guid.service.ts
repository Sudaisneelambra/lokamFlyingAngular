import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class GuideService{

    constructor(private http:HttpClient){}

  private api = 'http://13.201.116.55:3000';

   // adding guide api
   addguide(data:any):Observable<any>{
    return this.http.post(`${this.api}/agency/guideadd`,data)
  }

   //all place getting api
   gettingguides():Observable<any>{
    return this.http.get(`${this.api}/agency/getguide`)
  }

  // deleting guide from database
  deletingGuide(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deleteguide/${id}`)
  }

  // edit guide api
  editguide(data:any):Observable<any>{
    return this.http.put(`${this.api}/agency/editguide`,data)
  }

  // getting all detials of specific guide
  getsingleguide(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/getsingleguide/${id}`)
  }

  // delete conformation
  confirmation(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/confirmationguid/${id}`)
  }

  packageguidedelete(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deletepackageguide/${id}`)
  }
}