import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io } from "socket.io-client";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private http: HttpClient, private router:Router ) {}

  socket = io('http://localhost:1000');

  private baseUrl = 'http://localhost:1000'; 

  sendMessage(message: any, sender:string,reviver:string) {
    console.log('sendMessage: ', message)
    this.socket.emit('message', {message,sender,reviver});
  }




  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usermessages`);
  }

  getsingleusrchat(data:any):Observable<any>{
    return this.http.get(`${this.baseUrl}/getsingleusrchat/${data}`)
  }

  
  
}
