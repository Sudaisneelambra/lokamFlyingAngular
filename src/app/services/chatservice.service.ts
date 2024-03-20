import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private http: HttpClient, private router:Router ) {}


  private baseUrl = environment.backEndurl; 
 




  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chat/usermessages`);
  }

  getsingleusrchat(data:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/chat/getsingleusrchat/${data}`)
  }

  
  
}
