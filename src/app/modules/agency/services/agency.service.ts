import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class agencyService {
  constructor(private http: HttpClient) {}
  
  private api = 'http://localhost:3000';
  
  // token check
  gettoken():Observable<any>{
    return this.http.get(`${this.api}/agency/gettoken`)
  }

  // logout and token delete
  agencylogout(): Observable<any> {
    const one = localStorage.getItem('token');
    console.log(one);

    localStorage.clear()
    return this.http.get(`${this.api}/user/logout`);
  }
}
