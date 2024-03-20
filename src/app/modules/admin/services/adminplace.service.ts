import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root',
})

export class placesService {

    constructor(private http: HttpClient) {}

  private api = environment.backEndurl;


  gettingallplaces():Observable<any>{
    return this.http.get(`${this.api}/admin/gettingallplaces`)
  }

} 