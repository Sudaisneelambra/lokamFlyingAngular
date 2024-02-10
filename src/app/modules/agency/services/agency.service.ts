import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class agencyService{

    constructor(private http:HttpClient){}

private api='http://localhost:3000'

addProfile(data:any):Observable<any>{
    
    return this.http.post(`${this.api}/agency/profileadd`,data)
}


}