import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class admincommon {

    constructor(private http: HttpClient,private router:Router) {}

    private api = 'http://localhost:3000';

  // logout and token delete
  agencylogout(){
    const one = localStorage.getItem('token');
    console.log(one);

    localStorage.clear()
    this.router.navigate(['/authentication'])
    
  }

  getallbooking():Observable<any>{
    return this.http.get(`${this.api}/admin/getallbooking`)
  }

  getallagencyreview():Observable<any>{
    return this.http.get(`${this.api}/admin/getallagencyreview`)
  }

} 