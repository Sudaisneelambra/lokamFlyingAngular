import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class placesService {

    constructor(private http: HttpClient) {}

  private api = 'http://localhost:3000';


  gettingallplaces():Observable<any>{
    return this.http.get(`${this.api}/admin/gettingallplaces`)
  }

} 