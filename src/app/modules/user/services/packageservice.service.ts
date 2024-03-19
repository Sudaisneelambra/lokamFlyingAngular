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
export class UserPackageService {
  constructor(private http: HttpClient, private router:Router ) {}

  private api = 'http://13.201.116.55';

  gettingpackages():Observable<any>{
    return this.http.get(`${this.api}/user/getpackages`)
  }
  getsinglepackage(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/getsinglepackage/${id}`)
  }

  getpackage(id:any):Observable<any>{
    return this.http.get(`${this.api}/user/getpackage/${id}`)
  }

  
}
