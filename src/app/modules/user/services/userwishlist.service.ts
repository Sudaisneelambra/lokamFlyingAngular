import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserWishlistService {
  constructor(private http: HttpClient, private router:Router ) {}

  private api = environment.backEndurl;

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
