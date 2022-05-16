import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../classes/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getPatients() : Observable<Patient[]> {
    return this.http.get<Patient[]>(this.BASE_URL + 'patients');
  }

  getPatientsbySSN(ssn : string) : Observable<Patient> {
    return this.http.get<Patient>(this.BASE_URL + 'patient?ssn='+ ssn );
  }

}