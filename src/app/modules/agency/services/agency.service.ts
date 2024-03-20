import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class agencyService {
  constructor(private http: HttpClient,private router:Router) {}
  
  private api = environment.backEndurl;
  
  // token check
  gettoken():Observable<any>{
    return this.http.get(`${this.api}/agency/gettoken`)
  }


  findprofilecollection():Observable<any>{
    return this.http.get(`${this.api}/agency/profileckeck`)
  }

  getbooking():Observable<any>{
    return this.http.get(`${this.api}/agency/getbooking`)
  }

  getreview():Observable<any>{
    return this.http.get(`${this.api}/agency/getreview`)
  }

  // logout and token delete
  agencylogout(){
    const one = localStorage.getItem('token');

    localStorage.clear()
    this.router.navigate(['/authentication'])
    
  }
}
