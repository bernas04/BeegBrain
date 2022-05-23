import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userId = new Subject<string | null>()
  private baseUrl = 'http://127.0.0.1:8000/api/';
  //curentUserId = localStorage.getItem('user_id')

  constructor(private http: HttpClient) {
  }

  register = (username: string, email: string, password: string) => {
    const body = JSON.stringify(
      {
        "username": username,
        "password": password,
        "email": email,
      }
    );

    return this.http.post(
      this.baseUrl + "create_user",
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

}