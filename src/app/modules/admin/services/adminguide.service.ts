import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class adminguide {

  private api = 'http://localhost:3000';


    constructor(private http: HttpClient,private router:Router) {}


// guide getting

gettingguides():Observable<any>{
    return this.http.get(`${this.api}/admin/gettingguides`)
}
 
} 