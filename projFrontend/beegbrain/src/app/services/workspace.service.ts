import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  getErrorEEGs() {
    throw new Error('Method not implemented.');
  }

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getAllEEG(token : string) : Observable<EEG[]> {
    return this.http.get<EEG[]>(this.BASE_URL + 'eegs', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteEEG(id : number, token : string) {
    console.log("removing EEG<"+ id +">...")
    return this.http.delete<any>(this.BASE_URL + 'eeg', { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
      body: { id }
    });
  }

}
