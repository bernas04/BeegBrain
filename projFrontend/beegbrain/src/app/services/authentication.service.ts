import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userId = new Subject<string | null>()
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {
  }

  register = (email: string, password: string, health_number: string, birthday: Date, gender: string, telephone: string, address: string, profession: string, professional_number: string) => {
    const body = JSON.stringify(
      {
        "email": email,
        "password": password,
        "health_number": health_number,
        "birthday": birthday,
        "gender": gender,
        "telephone": telephone,
        "address": address,
        "profession": profession,
        "professional_number": professional_number,
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