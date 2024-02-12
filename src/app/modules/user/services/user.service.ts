import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class useservice {
  constructor(private http: HttpClient) {}

  private userapi = 'http://localhost:3000';

  userlogout(): Observable<any> {
    const one = localStorage.getItem('token');
    console.log(one);

    localStorage.removeItem('token'); // Remove JWT token from localStorage upon logout
    localStorage.removeItem('type'); // Remove JWT token from localStorage upon logout

    return this.http.get(`${this.userapi}/user/logout`);
    const tow = localStorage.getItem('token');
    console.log(tow);
  }
}
