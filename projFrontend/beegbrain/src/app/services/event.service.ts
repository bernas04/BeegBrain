import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/Doctor';
import { EEG } from '../classes/EEG';
import { Event } from '../classes/Event';
import { Operator } from '../classes/Operator';
import { Report } from '../classes/Report';

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
    console.log("TOKEN", token)
    return this.http.post<any>(this.BASE_URL + 'createEvent', event, { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
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

  getAllEegs(id: string, type: string, token: string): Observable<EEG[]> {
    if (type === 'doctor') {

      return this.http.get<EEG[]>(this.BASE_URL + 'doctorSharedFolders?id=' + id , { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });

    } else {

      return this.http.get<EEG[]>(this.BASE_URL + 'operatorSharedFolders?id=' + id , { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });

    }
  }

  getAllReport( token: string) : Observable<Report[]> {
    return this.http.get<Report[]>(this.BASE_URL + 'reports', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }

}
