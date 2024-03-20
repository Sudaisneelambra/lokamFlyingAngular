import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})

export class ProfileService{

    constructor(private http:HttpClient){}

    private api = environment.backEndurl;

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