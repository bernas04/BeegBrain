import { RevisionCenter } from './../classes/RevisionCenter';
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
  token = ''+localStorage.getItem('token');
  
  constructor(private http: HttpClient) { }

  getInstituitions() : Observable<Providence[]> {
    return this.http.get<Providence[]>(this.BASE_URL + 'proveniences', { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getRevisionCenter() : Observable<RevisionCenter[]> {
    return this.http.get<Providence[]>(this.BASE_URL + 'revisioncenters');
  }

  createDoctor = (name:string,email: string, password:string, birthday:Date, gender:string, healthNumber:string, telephone:string, address:string, medicalNumber:string, institutions:string): Observable<Object> => {
    const body = JSON.stringify(
      {
        "name":name,
        "email": email,
        "password": password,
        "address":address,
        "birthday": birthday,
        "gender": gender,
        "telephone": telephone,
        "health_number": healthNumber,
        "medical_number": medicalNumber,
        "institutions": institutions,
        
      }
    );

    return this.http.post(
      this.BASE_URL + "createDoctor",
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  createOperator = (name:string, email: string, password:string, birthday:Date, gender:string, healthnumber:Number, telephone:Number, address:string, operatorNumber:Number, providence:string) : Observable<Object> => {
    const body = JSON.stringify(
      {
        "name":name,
        "email": email,
        "address":address,
        "password": password,
        "birthday": birthday,
        "gender": gender,
        "telephone": telephone,
        "health_number": healthnumber,
        "operator_number": operatorNumber,
        "providence": providence,
        
      }
    );
    return this.http.post(
      this.BASE_URL + "createOperator",
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
 
}
