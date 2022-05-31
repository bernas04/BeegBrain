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
    return this.http.post<EEG>(this.BASE_URL + 'createEEG', formData, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token
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


  getEEGfiltered(id:number, patient_id:number, institution_id:number, date:Date, operator_id:number, priority:string, report_status:string, token: string) : Observable<EEG>{
    return this.http.get<EEG>(this.BASE_URL+ 'filter' +'eeg?id='+ id + '&patient_id=' + patient_id + '&institution_id=' + institution_id +'&date=' + date + '&operator_id=' + operator_id + '&priority' + priority + '&report_status=' + report_status, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      }),
    });
  }
}
