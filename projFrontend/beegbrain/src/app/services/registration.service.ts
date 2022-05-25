import { Institution } from './../classes/Institution';
import { Providence } from './../classes/Providence';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getInstituitions() : Observable<Providence[]> {
    return this.http.get<Providence[]>(this.BASE_URL + 'proveniences');
  }
 

 
}
