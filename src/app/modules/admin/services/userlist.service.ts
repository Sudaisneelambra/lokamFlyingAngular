import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';



@Injectable({
  providedIn: 'root',
})

export class userlist {

  constructor(private http: HttpClient) {}

  private api = environment.backEndurl;

  getuserlist():Observable<any>{
    return this.http.get(`${this.api}/admin/getuserlist`)
  }

  userblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/blockuser`,{id})
  }

  userunblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/unblockuser`,{id})
  }

  getblockeduserlist():Observable<any>{
    return this.http.get(`${this.api}/admin/getblockeduserlist`)
  }

} 