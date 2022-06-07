import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/Doctor';
import { Operator } from '../classes/Operator';
import { Providence } from '../classes/Providence';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getLabelsFromEEG(id: number, token: string) : Observable<String[]> {
      return this.http.get<String[]>(this.BASE_URL+'labels?eeg='+id,{ 
        headers: new HttpHeaders({
          'Authorization': 'Token ' + token,
          'Content-Type': 'application/json',
        }),
      });
  }
  
  getDoctorData(id: number, token: string){
    return this.http.get<Doctor>(this.BASE_URL+'doctor?medical='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
  
  getOperatorData(id: number, token: string){
    return this.http.get<Operator>(this.BASE_URL+'operator?operator='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getProvidence(id: number, token: string){
    return this.http.get<Providence>(this.BASE_URL+'providence?id='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  };
}
