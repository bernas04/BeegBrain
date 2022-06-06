import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../classes/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getReport(id:number, token: string) : Observable<Report>{
    return this.http.get<Report>(this.BASE_URL + 'report?id='+ id,  { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json',
      })
    })
  }

  setReport(report : Report, token: string) {
    return this.http.post<any>(this.BASE_URL + 'report', report, { 
      headers: new HttpHeaders({
        'Authorization': 'Token ' + token
      })
    })
  }


}
