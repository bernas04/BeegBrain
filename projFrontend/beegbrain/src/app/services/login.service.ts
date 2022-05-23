import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl='http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  logIn = (username: string, password: string) => {
      const body=JSON.stringify({"username": username, "password": password});

      return this.http.post(
        this.baseUrl+"login_token", 
        body,
        { 
          headers: new HttpHeaders({
            'Authorization': 'Basic ' + btoa(username +':'+ password),
            'Content-Type': 'application/json',
          }),
        }
      );
  }

  getUserInfo = (username: string, token: string) => {
    return this.http.get(
      this.baseUrl + "get_user?username=" + username,
      { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
