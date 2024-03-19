import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class agencylist {

    constructor(private http: HttpClient) {}

  private api = 'http://13.201.116.55';

  getagencylist():Observable<any>{
    return this.http.get(`${this.api}/admin/getagencylist`)
  }

  agencyblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/agencyblock`,{id})
  }
  agencyunblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/agencyunblock`,{id})
  }


  getblockedagencylist():Observable<any>{
    return this.http.get(`${this.api}/admin/getblockedagencylist`)
  }

  getagencyfulldetais(id:any):Observable<any>{
    return this.http.get(`${this.api}/admin/getagencyfulldetais/${id}`)
  }

} 