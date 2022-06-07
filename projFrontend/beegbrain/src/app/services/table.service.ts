import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/Doctor';
import { EEG } from '../classes/EEG';
import { Institution } from '../classes/Institution';
import { Operator } from '../classes/Operator';
import { Patient } from '../classes/Patient';
import { Report } from '../classes/Report';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getEEGinfo(id:number, token: string) : Observable<EEG>{
    return this.http.get<EEG>(this.BASE_URL+'eeg?id='+id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getOperators( token:string) : Observable<Operator[]>{
    return this.http.get<Operator[]>(this.BASE_URL+'operators', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });

  }
  
  getInstitution(id:number, token: string) : Observable<Institution>{
    return this.http.get<Institution>(this.BASE_URL+'providence/operator?id='+id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }


}
