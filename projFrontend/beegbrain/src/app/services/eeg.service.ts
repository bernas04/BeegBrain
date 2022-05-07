import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { EEG } from '../classes/EEG';
import { Operator } from '../classes/Operator';
import { Patient } from '../classes/Patient';

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

    // let eeg = new EEG;
    // let patient = new Patient;
    // let operator = new Operator;
    // operator.healthNumber = operatorID;
    // patient.healthNumber = patientID;
    // eeg.patient = patient;
    // eeg.operator = operator;
    // eeg.file = file;

    const data = {
      'operatorID':operatorID,
      'patientID':patientID,
      'file':file
    }

    console.log(file)

    const uploadData = new FormData();
    uploadData.append('operatorID', operatorID);
    uploadData.append('patientID', patientID);
    uploadData.append('file', file, "file.eeg");

    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      }),
      responseType: 'blob'
    };

    return axios.post(this.BASE_URL + 'createEEG', uploadData, httpOptions);

  }

}