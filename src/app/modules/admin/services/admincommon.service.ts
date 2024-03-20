import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})

export class admincommon {

    constructor(private http: HttpClient,private router:Router) {}

    private api = environment.backEndurl;

  // logout and token delete
  agencylogout(){
    const one = localStorage.getItem('token');
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