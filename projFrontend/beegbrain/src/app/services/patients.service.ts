import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';
import { Patient } from '../classes/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getPatients(token: string) : Observable<Patient[]> {
    return this.http.get<Patient[]>(this.BASE_URL + 'patients',{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getPatientsbySSN(ssn : string, token: string) : Observable<Patient> {
    return this.http.get<Patient>(this.BASE_URL + 'patient?ssn='+ ssn, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getPatientsbyName(string : string, token: string) : Observable<Patient[]> {
    return this.http.get<Patient[]>(this.BASE_URL + 'strPatients?str='+ string, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getPatientbyId(id : number, token: string) : Observable<Patient> {
    return this.http.get<Patient>(this.BASE_URL + 'patient/'+ id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getEEGbyPatient(id : number, token: string) : Observable<EEG[]> {
    return this.http.get<EEG[]>(this.BASE_URL + 'eegs/'+ id, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      })
    });
  }
  

  getEEGbySharedFolder(id : number, type: string, token: string) : Observable<EEG[]> {

    if (type === 'operator') {
      return this.http.get<EEG[]>(this.BASE_URL + 'operatorSharedFolders?id='+ id, { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        })
      });

    } else {
      return this.http.get<EEG[]>(this.BASE_URL + 'doctorSharedFolders?id='+ id, { 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        })
      });

    }
  }


}
