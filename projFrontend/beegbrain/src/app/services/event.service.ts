import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/Doctor';
import { Event } from '../classes/Event';
import { Operator } from '../classes/Operator';

declare let Email : any;


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getAllEvents( token: string) : Observable<Event[]> {
    return this.http.get<Event[]>(this.BASE_URL + 'events', { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
    });
  }

  addEvent(event: JSON, token: string) {
    return this.http.post<any>(this.BASE_URL + 'createEvent', event, { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token
        })
      })
  }

  getOperator(token: string) : Observable<Operator[]> {
    return this.http.get<Operator[]>(this.BASE_URL + 'operators', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }

  getDoctor(token: string) : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.BASE_URL + 'doctors', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }

}
