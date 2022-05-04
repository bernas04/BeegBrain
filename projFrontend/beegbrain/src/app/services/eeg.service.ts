import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/Doctor';
import { EEG } from '../classes/EEG';
import { Operator } from '../classes/Operator';
import { Patient } from '../classes/Patient';
import { Report } from '../classes/Report';

@Injectable({
  providedIn: 'root'
})
export class EEGService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  submitEEG(patientID: string, operatorID: string, file: File) : Observable<EEG> {

    let formData = new FormData();
    formData.append("file", file);
    formData.append('patientID', patientID);
    formData.append('operatorID', operatorID);

    console.log(patientID);
    console.log(operatorID);
    console.log(file);

    return this.http.post<any>(this.BASE_URL + 'createEEG', formData);

  }

}
