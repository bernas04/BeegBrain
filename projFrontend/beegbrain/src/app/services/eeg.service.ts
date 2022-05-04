import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  submitEEG(patientID: string, operatorID: string, file: File) {

    let parameters = { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })};

    let eeg = new EEG;
    let patient = new Patient;
    let operator = new Operator;
    operator.healthNumber = operatorID;
    patient.healthNumber = patientID;
    eeg.patient = patient;
    eeg.operator = operator;
    eeg.file = file;
    
    return this.http.post<any>(this.BASE_URL + 'createEEG', eeg, parameters);

  }

}
