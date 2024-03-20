import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})

export class packagelistservice {

    constructor(private http: HttpClient) {}

  private api = environment.backEndurl;

  gettingpackages():Observable<any>{
    return this.http.get(`${this.api}/admin/gettingpackages`)
  }

  packageblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/packageblock`,{id})
  }

  packageunblock(id:any):Observable<any>{
    return this.http.post(`${this.api}/admin/packageunblock`,{id})
  }

} 