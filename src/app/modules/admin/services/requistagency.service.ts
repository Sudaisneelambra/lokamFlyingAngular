import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class requestagency {

    constructor(private http: HttpClient) {}

  private api = 'http://localhost:3000';


  requestedagency():Observable<any>{
    return this.http.get(`${this.api}/admin/requests`)
  }

  approve(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/approve`,{id})
  }

} 