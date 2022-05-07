import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    console.log(file)

    const uploadData = new FormData();
    uploadData.append('operatorID', operatorID);
    uploadData.append('patientID', patientID);
    uploadData.append('file', file, file.name);
    
    const httpOptions : Object = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data'
      }),
      responseType: 'blob'
    };

    return this.http.post<any>(this.BASE_URL + 'createEEG', uploadData, httpOptions);

  }

}