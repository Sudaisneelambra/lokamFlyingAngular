import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})

export class ChattingSerive {

    constructor(private http: HttpClient,private router:Router) {}

    // socket = io('http://localhost:1000');
  
    private baseUrl = 'http://localhost:3000'; 
  
    // sendMessage(message: any, username:string) {
    //   console.log('sendMessage: ', message)
    //   this.socket.emit('message', {message,username});
    // }
  
  
  
    getMessages(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/chat/allmessages`);
    }
    

} 