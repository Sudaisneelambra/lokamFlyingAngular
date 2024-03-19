import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProfileService{

    constructor(private http:HttpClient){}

    private api = 'http://13.201.116.55:3000';

    // getting profile name
  getingprofilename():Observable<any>{
    return this.http.get(`${this.api}/agency/profilenameget`)
  }

    // profile adding or updating
    addProfile(data: any): Observable<any> {
        return this.http.post(`${this.api}/agency/profileadd`, data);
      }

       // getting profile all data
  getingprofile():Observable<any>{
    return this.http.get(`${this.api}/agency/profileget`)
  }


}