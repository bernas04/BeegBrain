import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../classes/Doctor';
import { EEG } from '../classes/EEG';
import { Operator } from '../classes/Operator';
import { Patient } from '../classes/Patient';
import { Report } from '../classes/Report';
import { Channel } from '../classes/Channel';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getLabelsFromEEG(id: number) : Observable<String[]> {
      return this.http.get<String[]>(this.BASE_URL+'labels?eeg='+id);
  }

  

}
