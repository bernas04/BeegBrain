import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EEG } from '../classes/eeg';

@Injectable({
  providedIn: 'root'
})
export class EEGService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  submitEEG(patient: Patient, opetator: Operator, file: File) {

    let eeg : EEG = new EEG;
    eeg.patientID = 

    return this.http.post<EEG>(this.BASE_URL + 'createEEG', eeg,  { 
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });

  }
/* 
  DEPOIS, UMA VEZ QUE OS POSTS E GETS VÃO TER TOKENS DE AUTORIZAÇÃO, VAI FICAR ASSIM:
  return this.http.post<EEG>(this.BASE_URL + 'createEEG', eeg,  { 
    headers: new HttpHeaders({
      'Authorization': 'Token ' + token,
      'Content-Type': 'application/json',
    }),
  });
 */

}
