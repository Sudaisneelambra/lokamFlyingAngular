import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PlaceService{

    constructor(private http:HttpClient){}

  private api = 'http://13.201.116.55';

    // add place api
    addplace(data:any):Observable<any>{
        return this.http.post(`${this.api}/agency/placeadd`,data)
      }

        // all place getting api
  gettingplace():Observable<any>{
    return this.http.get(`${this.api}/agency/getplace`)
  }

  // getting all detials of specific place
  getsingleplace(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/getsingleplace/${id}`)
  }

    // deleting place from database
    deletingPlace(id:any):Observable<any>{
        return this.http.delete(`${this.api}/agency/deleteplace/${id}`)
      }

    // edit place api
  editplace(data:any):Observable<any>{
    return this.http.put(`${this.api}/agency/editplace`,data)
  }

  confirmation(id:any):Observable<any>{
    return this.http.get(`${this.api}/agency/confirmation/${id}`)
  }

  packageplacedelete(id:any):Observable<any>{
    return this.http.delete(`${this.api}/agency/deletepackageplace/${id}`)
  }

}