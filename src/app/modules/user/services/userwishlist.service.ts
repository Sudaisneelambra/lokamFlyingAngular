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
export class UserWishlistService {
  constructor(private http: HttpClient, private router:Router ) {}

  private api = 'http://13.201.116.55:3000';

   addtowishlist(id:any):Observable<any>{
    return this.http.post(`${this.api}/user/addtowishlist`,{id})
   }
   getwishlist():Observable<any>{
    return this.http.get(`${this.api}/user/getwishlist`)
   }

   removewishlist(id:any):Observable<any>{
    return this.http.delete(`${this.api}/user/removewishlist/${id}`)
   }
}
