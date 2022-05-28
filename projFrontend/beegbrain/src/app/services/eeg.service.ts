import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EEG } from '../classes/EEG';
@Injectable({
  providedIn: 'root'
})
export class EEGService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  submitEEG(formData : FormData, token: string) : Observable<EEG> {
    return this.http.post<EEG>(this.BASE_URL + 'createEEG', formData,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

  getEEGinfo(id:number, token: string) : Observable<EEG>{
    return this.http.get<EEG>(this.BASE_URL+'eeg?id='+id,{ 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }

}
