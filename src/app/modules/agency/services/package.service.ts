import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class packageService {

  constructor(private http: HttpClient) {}
  
  private api = environment.backEndurl;


  // package adding api
  addpackage(data:any):Observable<any>{
    return this.http.post(`${this.api}/agency/packageadd`,data)
  }

  //all package getting api
  gettingpackages():Observable<any>{
    return this.http.get(`${this.api}/agency/getpackage`)
  }

    // packagesingle check
    getsinglepackage(id:any):Observable<any>{
        return this.http.get(`${this.api}/agency/getsinglepackage/${id}`)
      }

        // deleting package
  deletingPackage(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deletepackage/${id}`)
  }
  
    // editpackage
    edipackage(data:any):Observable<any>{
        return this.http.put(`${this.api}/agency/editpackage`,data)
      }

}