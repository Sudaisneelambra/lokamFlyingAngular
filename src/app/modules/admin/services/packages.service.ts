import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class packagelistservice {

    constructor(private http: HttpClient) {}

  private api = 'http://13.201.116.55';

  gettingpackages():Observable<any>{
    return this.http.get(`${this.api}/admin/gettingpackages`)
  }

  packageblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/packageblock`,{id})
  }

  packageunblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/packageunblock`,{id})
  }

} 